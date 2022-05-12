# 20/04/22 - 29/04/2022 - Sofiia Petryshyn
# Here we build a skeleton tracker.
# We connect every skeleton from previous video frame to the current one.
# If there is a deficit of skeletons on previous image, we duplicate one of the skeletons on that frame.
# if there is a proficit of skeletons on previous image, we duplicate one of the skeletons on the next frame.
#
# we have a bunch of json files,
# and we read each of them to get more data
import json
import os
import pandas as pd
import numpy as np


def read_json(json_file):
    '''
    Read JSON & Return a list of each image each skeleton objects.
    return: list(dict)
    '''
    json_file = open(os.path.join(jsonS_path, json_file), 'r')
    return json.load(json_file)


def compare_keypoints_and_create_pairs(prev_keypoints, cur_keypoints):
    '''
    Get summed distance between (prev_keypoints & cur_keypoints)
    len(prev_keypoints): 51
    len(cur_keypoints): 51
    Dimention of prev_keypoint (same for cur_keypoints):
        len = number of skeletons detected on the same image
        len of each keypoint array = 17 * 3
        , where for each keypoint we have [x, y, score]
    return: summmed distance of each keypoint in prev & cur keypoints
    '''
    dist_array = []
    for i in range(int(len(prev_keypoints) / 3)):  # max i = 16, so last (x,y,c) = 48,49,50
        # notation: point = np.array((x, y))
        point1 = np.array((prev_keypoints[i * 3], prev_keypoints[i * 3 + 1]))
        point2 = np.array((cur_keypoints[i * 3], cur_keypoints[i * 3 + 1]))

        dist = np.linalg.norm(point1 - point2)
        dist_array.append(dist)
    return np.sum(dist_array)


class Pair:
    def __init__(self, prev_keypoint_id, \
                 cur_keypoint_id, sum_of_dist_btw_keypoints, \
                 from_img, to_img, \
                 keypairs_from, keypairs_to, \
                 num_of_skeletons_on_prev_img, \
                 num_of_skeletons_on_cur_img
                 ):
        self.prev_keypoint_id = prev_keypoint_id
        self.cur_keypoint_id = cur_keypoint_id
        self.sum_of_dist_btw_keypoints = sum_of_dist_btw_keypoints
        self.from_img = from_img
        self.to_img = to_img
        self.keypairs_from = keypairs_from
        self.keypairs_to = keypairs_to
        self.num_of_skeletons_on_prev_img = num_of_skeletons_on_prev_img
        self.num_of_skeletons_on_cur_img = num_of_skeletons_on_cur_img

    def is_prev_keypoint_id(self, search_id):
        return self.prev_keypoint_id == search_id

    def to_dict(self):
        return {
            'prev_keypoint_id': self.prev_keypoint_id,
            'cur_keypoint_id': self.cur_keypoint_id,
            'sum_of_dist_btw_keypoints': self.sum_of_dist_btw_keypoints,
            'from_img': self.from_img,
            'to_img': self.to_img,
            'keypairs_from': self.keypairs_from,
            'keypairs_to': self.keypairs_to,
            'num_of_skeletons_on_prev_img': self.num_of_skeletons_on_prev_img,
            'num_of_skeletons_on_cur_img': self.num_of_skeletons_on_cur_img
        }

    def __repr__(self, flag_full=False):
        if flag_full is False:
            return f'''
            prev_keypoint_id: {self.prev_keypoint_id};
            cur_keypoint_id: {self.cur_keypoint_id};
            sum_of_dist_btw_keypoints: {self.sum_of_dist_btw_keypoints};
            from_img: {self.from_img};
            to_img: {self.to_img};
            '''
        else:
            return f'''
            prev_keypoint_id: {self.prev_keypoint_id};
            cur_keypoint_id: {self.cur_keypoint_id};
            sum_of_dist_btw_keypoints: {self.sum_of_dist_btw_keypoints};
            from_img: {self.from_img};
            to_img: {self.to_img};
            keypairs_from: {self.keypairs_from};
            keypairs_to: {self.keypairs_to};
            num_of_skeletons_on_prev_img: {self.num_of_skeletons_on_prev_img};
            num_of_skeletons_on_cur_img: {self.num_of_skeletons_on_cur_img}
            '''


def sort_pairs_by_smallest_dist(list_of_pairs):
    '''
    Sorted from a smaller distance between points to a larger distance
    '''
    return sorted(list_of_pairs, key=lambda pair: pair.sum_of_dist_btw_keypoints)


def get_smallest_dist_within_pairs(list_cloud_of_pairs):
    print('list_cloud_of_pairs = ', list_cloud_of_pairs)
    min_dist = min([pair.sum_of_dist_btw_keypoints for pair in list_cloud_of_pairs])
    for pair in list_cloud_of_pairs:
        print('sum_of_dist_btw_keypoints, min_dist = ', pair.sum_of_dist_btw_keypoints, min_dist)
        if pair.sum_of_dist_btw_keypoints == min_dist:
            return pair
    return None


def create_pairs(sorted_pairs_by_dist):
    '''
    sorted_pairs_by_dist: list of keypoints from one image to another
    So that num_of_skeletons_on_prev_img & num_of_skeletons_on_cur_img is always the same

    We can get the following information about a pair:
        prev_keypoint_id
        cur_keypoint_id
        sum_of_dist_btw_keypoints
        from_img
        to_img
        keypairs_from
        keypairs_to
        num_of_skeletons_on_prev_img
        num_of_skeletons_on_cur_img

    '''
    final_pairs = []
    used_i, used_j = set(), set()
    num_of_skeletons_on_prev_img, num_of_skeletons_on_cur_img = \
        sorted_pairs_by_dist[0].num_of_skeletons_on_prev_img, \
        sorted_pairs_by_dist[0].num_of_skeletons_on_cur_img
    max_prev_keypoint_id = max([pair.prev_keypoint_id for pair in sorted_pairs_by_dist])
    max_cur_keypoint_id = max([pair.cur_keypoint_id for pair in sorted_pairs_by_dist])

    list_to_detect_min_dist = []
    #     print("In 'sorted_pairs_by_dist' we have all the pairs:")
    # we should remember that every pair in sorted_pairs_by_dist
    # is gonna follow the same way of going to else if operator
    # so 'list_to_detect_min_dist' is safe and not changed till the next loop
    print('In this pair we have there amounts of skeletons: ')
    print('num_of_skeletons_on_prev_img = ', num_of_skeletons_on_prev_img, \
          'num_of_skeletons_on_cur_img = ', num_of_skeletons_on_cur_img)
    if num_of_skeletons_on_prev_img == num_of_skeletons_on_cur_img:
        pass
    elif num_of_skeletons_on_prev_img > num_of_skeletons_on_cur_img:
        print('So there are more skeletons on PREV image.')
        # choose the cloud of id
        print('We are going to add to the cloud each pair, where only previous id connected to all current ids.')
        for desired_cur_id in range(0, max_cur_keypoint_id + 1):
            desired_id_list = []
            for pair in sorted_pairs_by_dist:
                print('We are working with the pair of following IDs:')
                print('prev_keypoint_id = ', pair.prev_keypoint_id, \
                      'cur_keypoint_id = ', pair.cur_keypoint_id)
                print('desired_cur_id = ', desired_cur_id)
                if pair.cur_keypoint_id == desired_cur_id:
                    desired_id_list.append(pair)  # (prev_id; cur_id) -> EA, EB, EC, ED - xxx
        print([(pair.prev_keypoint_id, pair.cur_keypoint_id) for pair in desired_id_list])
        print('Here I got all the combinations of prev image & all the current ids ones.')
        # find the smallest dist in the cloud (this is a cloud = 'desired_id_list')
        min_dist_pair = get_smallest_dist_within_pairs(desired_id_list)  # 0.1 - EA
        # list_to_detect_min_dist is a list with each cloud min distance
        list_to_detect_min_dist.append(min_dist_pair)

    elif num_of_skeletons_on_prev_img < num_of_skeletons_on_cur_img:
        print('So there are more skeletons on CUR image.')
        # choose the cloud of id
        # max_cur_keypoint_id is used cause i want to reach higher number of pairs
        # (same as bigger 'num_of_skeletons_on_cur_img')
        print('We are going to add to the cloud each pair, where only each current id connected to all prev ids.')
        for desired_prev_id in range(0, max_prev_keypoint_id + 1):
            desired_id_list = []
            for pair in sorted_pairs_by_dist:
                print('We are working with the pair of following IDs:')
                print('prev_keypoint_id = ', pair.prev_keypoint_id, \
                      'cur_keypoint_id = ', pair.cur_keypoint_id)
                print('desired_prev_id = ', desired_prev_id)
                if pair.prev_keypoint_id == desired_prev_id:
                    desired_id_list.append(pair)  # (cur_id; prev_id) -> AE, BE, CE, DE - xxx
            print([(pair.prev_keypoint_id, pair.cur_keypoint_id) for pair in desired_id_list])
            # find the smallest dist in the cloud (this is a cloud = desired_id_list)
            min_dist_pair = get_smallest_dist_within_pairs(desired_id_list)  # 0.1 - EA
            print('the smallest dist is: ', (min_dist_pair.prev_keypoint_id, min_dist_pair.cur_keypoint_id))
            # list_to_detect_min_dist is a list with each cloud min distance
            list_to_detect_min_dist.append(min_dist_pair)

    for pair in sorted_pairs_by_dist:
        if num_of_skeletons_on_prev_img == num_of_skeletons_on_cur_img:
            if (pair.prev_keypoint_id not in used_i) and \
                    (pair.cur_keypoint_id not in used_j):
                final_pairs.append(pair)
                used_i.add(pair.prev_keypoint_id)
                used_j.add(pair.cur_keypoint_id)
        elif num_of_skeletons_on_prev_img > num_of_skeletons_on_cur_img:
            # TODO: if we want this code to work on a group,
            # where a lot of pairs can be fucked up from 2 people into 1 object by AlphaPose
            # we should make the algorithm better
            # ---
            # get prev_id of the cloud where there exists the minimal distance between skeletons
            # cur_keypoint_id - because there is gonna be a duplication of cur frame skeleton
            id_cloud_where_dist_is_the_smallest = min(list_to_detect_min_dist, \
                                                      key=lambda x: x.sum_of_dist_btw_keypoints).cur_keypoint_id
            print('There will be two pairs with this cur id: ', id_cloud_where_dist_is_the_smallest)
            print(
                'get cur_id (the one that is gonna be duplicated) of the could where there exists the minimal distance between skeletons')
            print('id_cloud_where_dist_is_the_smallest = ', id_cloud_where_dist_is_the_smallest)
            # then for this ID, we create a duplicate in a set ;)
            first_time_flag = True
            if (pair.prev_keypoint_id not in used_i) and \
                    (pair.cur_keypoint_id not in used_j):
                final_pairs.append(pair)
                used_i.add(pair.prev_keypoint_id)
                used_j.add(pair.cur_keypoint_id)
                # code to add a duplicate
                if (first_time_flag is True) and \
                        (pair.cur_keypoint_id == id_cloud_where_dist_is_the_smallest):
                    first_time_flag = False
                    used_j.remove(pair.cur_keypoint_id)
        elif num_of_skeletons_on_prev_img < num_of_skeletons_on_cur_img:
            id_cloud_where_dist_is_the_smallest = min(list_to_detect_min_dist, \
                                                      key=lambda x: x.sum_of_dist_btw_keypoints).prev_keypoint_id
            print(
                'get prev_id (the one that is gonna be duplicated) of the could where there exists the minimal distance between skeletons')
            print('id_cloud_where_dist_is_the_smallest = ', id_cloud_where_dist_is_the_smallest)
            # then for this ID, we create a duplicate in a set ;)
            first_time_flag = True
            if (pair.prev_keypoint_id not in used_i) and \
                    (pair.cur_keypoint_id not in used_j):
                final_pairs.append(pair)
                used_i.add(pair.prev_keypoint_id)
                # code to add a duplicate
                if (first_time_flag is True) and \
                        (pair.prev_keypoint_id == id_cloud_where_dist_is_the_smallest):
                    first_time_flag = False
                    used_i.remove(pair.prev_keypoint_id)
                used_j.add(pair.cur_keypoint_id)
    print('LEN final_pairs = ', len(final_pairs))
    return final_pairs


if __name__ == '__main__':
    res_df_dir = '../data/df_pairs_each_video_with_duplicates_where_AP_fails'
    processed_files = os.listdir(res_df_dir)
    # processed_files.remove('LuKekvgdkiE_130_.csv')

    jsonS_path = '../data/json_files_each_video'
    jsonS_list = sorted(os.listdir(jsonS_path))

    for i_json, json_file in enumerate(jsonS_list):
        csv_name_of_json = json_file[:-5] + '.csv'
        res_df_path = os.path.join(res_df_dir, csv_name_of_json)
        if csv_name_of_json in processed_files:
            print(f'File {csv_name_of_json} was passed.')
            continue
        frames = []
        if json_file == '.DS_Store':
            continue
        print('Working with JSON file: ', json_file)

        json_list_of_keypoints_dicts = read_json(json_file)
        df = pd.DataFrame(json_list_of_keypoints_dicts)
        frames_img_ids = sorted(set(df['image_id']))
        pev_image_name, image_name = frames_img_ids[0], frames_img_ids[0]
        # ***
        # 0005: if there are 7 people detected
        # all_samples_prev_keypoints would have 7 items to iterate
        # ***
        all_samples_prev_keypoints = df[df['image_id'] == image_name]['keypoints'].tolist()
        list_of_pairs = []
        json_united_list_of_final_pairs = []
        next_json_keypoints_exist_flag = 0
        # we iterate over each 0005 -> 0010 -> 0015 ...
        for i, image_name in enumerate(frames_img_ids[1:]):
            print('\tFROM image sample: ', pev_image_name)
            print('\tTO   image sample: ', image_name)
            #         print('sorted_pairs_by_dist = ', sorted_pairs_by_dist)
            #         break
            all_samples_cur_keypoints = df[df['image_id'] == image_name]['keypoints'].tolist()
            for i, prev_keypoints in enumerate(all_samples_prev_keypoints):
                for j, cur_keypoints in enumerate(all_samples_cur_keypoints):
                    # compare keypoints & create pairs
                    sum_of_dist_btw_keypoints = compare_keypoints_and_create_pairs(prev_keypoints, cur_keypoints)
                    pair = Pair(i, j, sum_of_dist_btw_keypoints, \
                                from_img=pev_image_name, to_img=image_name, \
                                keypairs_from=prev_keypoints, keypairs_to=cur_keypoints, \
                                num_of_skeletons_on_prev_img=len(all_samples_prev_keypoints), \
                                num_of_skeletons_on_cur_img=len(all_samples_cur_keypoints)
                                )
                    list_of_pairs.append(pair)
            # algorithm to choose there there are the smallest distances btw keypoints
            sorted_pairs_by_dist = sort_pairs_by_smallest_dist(list_of_pairs)
            list_of_final_pairs = create_pairs(sorted_pairs_by_dist)
            print('LEN of list_of_final_pairs = ', list_of_final_pairs)
            # TODO: rank by bounding boxes overlap.
            # This step can be done to improve the algorithm , not needed so far
            # ***
            print(f'''
            ***************************
            Found final pairs list for {pev_image_name} &
                                       {image_name}
            ***************************
            ''')
            # ***
            # TODO: save a table of pairs with keypoints
            # to table 'list_of_final_pairs'
            # ***
            df_final_pairs = pd.DataFrame.from_records([pair.to_dict() for pair in list_of_final_pairs])
            frames.append(df_final_pairs)

            pev_image_name = image_name
            prev_keypoints = cur_keypoints
        # save pairs file
        df_final_pairs_merged = pd.concat(frames)
        df_final_pairs_merged.to_csv(res_df_path, index=False)
        print(f'File {res_df_path} has been saved successfully.')
    #         break
    #         print(list_of_final_pairs[0])
    #         break
    #     df['area'] = df.apply(lambda x: x['box'][-1]*x['box'][-2], axis=1)
    #     df['x'] = df.apply(lambda x: x['box'][0], axis=1)
    #     df['y'] = df.apply(lambda x: x['box'][1], axis=1)
    #     df['w'] = df.apply(lambda x: x['box'][2], axis=1)
    #     df['l'] = df.apply(lambda x: x['box'][3], axis=1)
    #     df.drop(['category_id', 'score', 'idx', 'box'], axis=1, inplace=True)

    #     for image_name in set(df['image_id']):
    #         print(df[df['image_id'] == image_name]['image_id'])
    #         break
    #     break

    # df_final_pairs
