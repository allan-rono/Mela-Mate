from tensorflow.keras.models import model_from_json
from keras.optimizers import Adam
import tensorflow as tf


def ClassifyImage(img_metadata):
    # load json and create model
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model.h5")
    
    opt = Adam(learning_rate=0.000001)
    loaded_model.compile(optimizer = opt , loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True) , metrics = ['accuracy'])
    
    pred = loaded_model.predict(img_metadata)
    
    return(pred[0][0])