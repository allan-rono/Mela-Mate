from ClassifyImage.py import ClassifyImage
from ImageTransformer.py import ImageTransformer

def MelanomaProbability(path):
    img_metadata = ImageTransformer(path)
    melanoma_prob = ClassifyImage(img_metadata)
    
    return(melanoma_prob)