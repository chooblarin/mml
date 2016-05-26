import numpy as np

# See https://github.com/mnielsen/neural-networks-and-deep-learning/blob/master/src/network.py

def sigmoid(z):
  return 1.0 / (1.0 + np.exp(-z))

def sigmoid_prime(z):
  return sigmoid(z) * (1 - sigmoid(z))

class Network(object):

  def __init__(self, sizes):
    self.num_layers = len(sizes)
    self.sizes = sizes
    self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
    self.weights = [np.random.randn(y, x) for x, y in zip(sizes[:-1], sizes[1:])]

  def feedforward(self, a):
    pass

  def SDG(self, training_data, epochs, mini_batch_size, eta, test_data=None):
    pass

  def update_mini_batch(self, mini_batch, eta):
    pass

  def backprop(self, x, y):
    pass

  def evaluate(self, test_data):
    pass

  def cost_derivative(self, output_activations, y):
    pass
