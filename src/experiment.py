# -*- coding: utf-8 -*-

from sklearn.datasets import fetch_mldata
import network

mnist = fetch_mldata('MNIST original', data_home='tmp')

training_data_x = mnist.data[:10000]
training_data_y = mnist.target[:10000]
training_data = [(x, y) for x, y in zip(training_data_x, training_data_y)]

test_data_x = mnist.data[10000:11000]
test_data_y = mnist.target[10000:11000]
test_data = [(x, y) for x, y in zip(test_data_x, test_data_y)]

net = network.Network([784, 30, 10])
net.SGD(training_data, 30, 10, 3.0)
