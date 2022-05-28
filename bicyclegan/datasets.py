import glob
import random
import os
import numpy as np
import torch
from torch.utils.data import Dataset
from PIL import Image
import torchvision.transforms as transforms
from torchvision.transforms import functional as F
import json


class ImageDataset(Dataset):
    def __init__(self, root, orig, abstract, bbox, input_size, mode='train'):
        self.transform = transforms.Compose(
            [
                transforms.ToTensor(),
                transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5]),
            ]
        )
        self.orig = orig
        self.only_generated_video_directories = [el.split('/')[-1] for el in
                                                 sorted(glob.glob(os.path.join(os.path.join(root, mode), abstract) +
                                                                  "/*"))]
        self.abstract_files = self._get_list_of_images(root, mode, abstract)
        self.set_of_images = set([el.split('/')[-1] for el in self.abstract_files])
        self.orig_files = self._get_list_of_images(root, mode, orig)
        self.bbox_dict = self._get_json_of_sorted_bbox_img_details(root, mode, bbox)
        self.model_input_size = input_size

    def _get_list_of_images(self, root, mode, img_type):
        list_of_all_names = []
        if img_type == self.orig:
            for v in self.set_of_images:
                list_of_all_names.append(os.path.join(os.path.join(os.path.join(os.path.join(root, mode), img_type),
                                                                   v[:-8]), v))
            list_of_all_names = sorted(list_of_all_names)
        else:
            for v in self.only_generated_video_directories:
                list_of_all_names += sorted(glob.glob(os.path.join(os.path.join(os.path.join(root, mode),
                                                                                img_type), v) + "/*.*"))
            list_of_all_names = sorted(list_of_all_names)
        return list_of_all_names

    def _get_json_of_sorted_bbox_img_details(self, root, mode, bbox):
        abstract_files_short_path = set([el.split('/')[-1] for el in self.abstract_files])
        bbox_dict = {}
        for v in self.only_generated_video_directories:
            json_path = os.path.join(os.path.join(os.path.join(root, mode), bbox), v.split('/')[-1]) + '.json'
            json_f = open(json_path, 'r')
            json_f_data = json.load(json_f)
            for img_data in json_f_data:
                if img_data['image_id'] in abstract_files_short_path:
                    bbox_dict[img_data['image_id']] = img_data['box']
            json_f.close()
        return bbox_dict

    @staticmethod
    def _get_x_y_for_square(rad, bbox_x):
        if rad - bbox_x >= 0:
            return int(0)
        if rad - bbox_x < 0:
            return int(bbox_x - rad)

    def get_bbox_dict(self):
        return self.bbox_dict

    def __getitem__(self, index):
        indx_of_frame = index % len(self.abstract_files)
        # try:
        img_abst = Image.open(self.abstract_files[indx_of_frame])
        img_orig = Image.open(self.orig_files[indx_of_frame])
        # except IndexError:
        #     print(indx_of_frame)
        frame_name = self.orig_files[indx_of_frame].split('/')[-1]
        img_bbox = self.bbox_dict.get(frame_name, None)
        w, h = img_orig.size
        img_orig = self.transform(img_orig)
        img_abst = self.transform(img_abst)
        img_abst = F.resize(img_abst, [h, w])
        rad = int(h / 2)
        bbox_center_coord = ((img_bbox[0] + img_bbox[0] + img_bbox[2]) / 2,
                             (img_bbox[1] + img_bbox[1] + img_bbox[3]) / 2)
        bbox_x, bbox_y = bbox_center_coord[0], bbox_center_coord[1]
        x_pos = self._get_x_y_for_square(rad, bbox_x)
        # prepare for the model
        img_orig_cropped = F.resized_crop(img_orig, top=0, left=x_pos,
                                  height=h, width=h,
                                  size=[self.model_input_size, self.model_input_size],
                                  interpolation=transforms.InterpolationMode.BICUBIC
                                  )
        img_abst_cropped = F.resized_crop(img_abst, top=0, left=x_pos,
                                  height=h, width=h,
                                  size=[self.model_input_size, self.model_input_size],
                                  interpolation=transforms.InterpolationMode.BICUBIC
                                  )

        # if np.random.random() < 0.5:
        #     img_orig_cropped = Image.fromarray(np.array(img_orig_cropped)[:, ::-1, :], "RGB")
        #     img_abst_cropped = Image.fromarray(np.array(img_abst_cropped)[:, ::-1, :], "RGB")

        # img_orig_cropped = self.transform(img_orig_cropped)
        # img_abst_cropped = self.transform(img_abst_cropped)

        return {'img_orig': img_orig_cropped, 'img_abst': img_abst_cropped}

    def __len__(self):
        return len(self.abstract_files)

# class ImageDataset(Dataset):
#     def __init__(self, root, input_shape, mode="train"):
#         self.transform = transforms.Compose(
#             [
#                 transforms.Resize(input_shape[-2:], Image.BICUBIC),
#                 transforms.ToTensor(),
#                 transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5]),
#             ]
#         )
#
#         self.files = sorted(glob.glob(os.path.join(root, mode) + "/*.*"))
#
#     def __getitem__(self, index):
#
#         img = Image.open(self.files[index % len(self.files)])
#         w, h = img.size
#         img_A = img.crop((0, 0, w / 2, h))
#         img_B = img.crop((w / 2, 0, w, h))
#
#         if np.random.random() < 0.5:
#             img_A = Image.fromarray(np.array(img_A)[:, ::-1, :], "RGB")
#             img_B = Image.fromarray(np.array(img_B)[:, ::-1, :], "RGB")
#
#         img_A = self.transform(img_A)
#         img_B = self.transform(img_B)
#
#         return {"A": img_A, "B": img_B}
#
#     def __len__(self):
#         return len(self.files)
