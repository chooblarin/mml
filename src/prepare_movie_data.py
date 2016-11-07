# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
import pyprind
import os

# the dataset from http://ai.stanford.edu/~amaas/data/sentiment/
pbar = pyprind.ProgBar(50000)
labels = {'pos': 1, 'neg': 0}
df = pd.DataFrame()
for sub in ('test', 'train'):
    for lab in ('pos', 'neg'):
        path = '../data/aclImdb/%s/%s' % (sub, lab)
        for file in os.listdir(path):
            with open(os.path.join(path, file), 'r', encoding='utf-8') as infile:
                txt = infile.read()
                df = df.append([[txt, labels[lab]]], ignore_index=True)
                pbar.update()

df.columns = ['review', 'sentiment']

np.random.seed(0)
df = df.reindex(np.random.permutation(df.index))
df.to_csv('../data/movie_data.csv', index=False)
