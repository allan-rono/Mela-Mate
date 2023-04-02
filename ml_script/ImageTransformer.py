import cv2
import numpy as np

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


