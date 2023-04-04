import cv2
import numpy as np
import sys
#from tensorflow.keras.models import model_from_json
from keras.optimizers import Adam
import tensorflow as tf

img_path = sys.argv[1]

def ImageTransformer(img_path):
    data = [] 
    img_size = 120
    try:
        img_arr = cv2.imread(img_path)[...,::-1] #convert BGR to RGB format
        resized_arr = cv2.resize(img_arr, (img_size, img_size)) # Reshaping images to preferred size
        data.append(resized_arr)
    except Exception as e:
        print(e)
    x_test = np.array(data)
    x_test = np.array(x_test) / 255
    x_test.reshape(-1, img_size, img_size, 1)
    
    return(x_test)


def ClassifyImage(img_metadata):
    # load json and create model
    json_file = open('model.json', 'r') ## EDIT FILE PATH
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = tf.keras.models.model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model.h5") ## EDIT FILE PATH
    
    opt = Adam(learning_rate=0.000001)
    loaded_model.compile(optimizer = opt , loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True) , metrics = ['accuracy'], run_eagerly=True)
    
    pred = loaded_model.predict(img_metadata)
    
    return(pred[0][0])


def MelanomaProbability(path):
    img_metadata = ImageTransformer(path)
    melanoma_prob = ClassifyImage(img_metadata)
    
    return(melanoma_prob)

print(MelanomaProbability(img_path))

##python3 /Users/allanrono/Desktop/University/Masters/Semester\ 4/FIT5120/Dev\ Folder/Mela-Mate/ml_script/melamate.py python3 /Users/allanrono/Desktop/University/Masters/Semester\ 4/FIT5120/Dev\ Folder/Mela-Mate/ml_script/test_img.jpg