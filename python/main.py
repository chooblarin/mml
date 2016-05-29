import csv
import numpy as np
import network

with open('../data/Fisher.csv') as csvfile:
  dataReader = csv.reader(csvfile)
  nss = []
  for row in dataReader:
    if not ''.join(row).startswith('#'):
      ns = [int(x) for x in row]
      array = np.array(ns[1:])
      x = array[:, np.newaxis]
      y = np.array(ns[0])
      nss.append((x, y))

network = network.Network([4, 3, 3])
network.SDG(nss[:100], 100, 5, 0.02, test_data=nss[100:])
