from flask import Flask, jsonify,redirect,request,Response,json
from flask import *
from dotenv import load_dotenv
load_dotenv()
from bson.binary import Binary
import base64
import pymongo
from io import BytesIO
from flask_cors import CORS
import numpy as np
import pandas as pd
import sklearn
from statistics import mean
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import cv2
from PIL import Image
import pickle
import io
import timm
from tqdm import tqdm
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.optim import Adam, SGD
import torchvision.models as models
from torch.utils.data import DataLoader, Dataset
from torch.optim.lr_scheduler import StepLR
from datetime import datetime

import albumentations as A
from albumentations.pytorch import ToTensorV2
from sklearn.preprocessing import LabelEncoder

import warnings
warnings.filterwarnings('ignore')
# from user import routes

app = Flask(__name__)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

from user.models import User,client

db = client.posts 

List = ['','ABBOTTS BABBLER', 'ABBOTTS BOOBY', 'ABYSSINIAN GROUND HORNBILL',
       'AFRICAN CROWNED CRANE', 'AFRICAN EMERALD CUCKOO',
       'AFRICAN FIREFINCH', 'AFRICAN OYSTER CATCHER',
       'AFRICAN PIED HORNBILL', 'AFRICAN PYGMY GOOSE', 'ALBATROSS',
       'ALBERTS TOWHEE', 'ALEXANDRINE PARAKEET', 'ALPINE CHOUGH',
       'ALTAMIRA YELLOWTHROAT', 'AMERICAN AVOCET', 'AMERICAN BITTERN',
       'AMERICAN COOT', 'AMERICAN DIPPER', 'AMERICAN FLAMINGO',
       'AMERICAN GOLDFINCH', 'AMERICAN KESTREL', 'AMERICAN PIPIT',
       'AMERICAN REDSTART', 'AMERICAN ROBIN', 'AMERICAN WIGEON',
       'AMETHYST WOODSTAR', 'ANDEAN GOOSE', 'ANDEAN LAPWING',
       'ANDEAN SISKIN', 'ANHINGA', 'ANIANIAU', 'ANNAS HUMMINGBIRD',
       'ANTBIRD', 'ANTILLEAN EUPHONIA', 'APAPANE', 'APOSTLEBIRD',
       'ARARIPE MANAKIN', 'ASHY STORM PETREL', 'ASHY THRUSHBIRD',
       'ASIAN CRESTED IBIS', 'ASIAN DOLLARD BIRD',
       'ASIAN GREEN BEE EATER', 'ASIAN OPENBILL STORK', 'AUCKLAND SHAQ',
       'AUSTRAL CANASTERO', 'AUSTRALASIAN FIGBIRD', 'AVADAVAT',
       'AZARAS SPINETAIL', 'AZURE BREASTED PITTA', 'AZURE JAY',
       'AZURE TANAGER', 'AZURE TIT', 'BAIKAL TEAL', 'BALD EAGLE',
       'BALD IBIS', 'BALI STARLING', 'BALTIMORE ORIOLE', 'BANANAQUIT',
       'BAND TAILED GUAN', 'BANDED BROADBILL', 'BANDED PITA',
       'BANDED STILT', 'BAR-TAILED GODWIT', 'BARN OWL', 'BARN SWALLOW',
       'BARRED PUFFBIRD', 'BARROWS GOLDENEYE', 'BAY-BREASTED WARBLER',
       'BEARDED BARBET', 'BEARDED BELLBIRD', 'BEARDED REEDLING',
       'BELTED KINGFISHER', 'BIRD OF PARADISE',
       'BLACK AND YELLOW BROADBILL', 'BLACK BAZA',
       'BLACK BREASTED PUFFBIRD', 'BLACK COCKATO',
       'BLACK FACED SPOONBILL', 'BLACK FRANCOLIN', 'BLACK HEADED CAIQUE',
       'BLACK NECKED STILT', 'BLACK SKIMMER', 'BLACK SWAN',
       'BLACK TAIL CRAKE', 'BLACK THROATED BUSHTIT',
       'BLACK THROATED HUET', 'BLACK THROATED WARBLER',
       'BLACK VENTED SHEARWATER', 'BLACK VULTURE',
       'BLACK-CAPPED CHICKADEE', 'BLACK-NECKED GREBE',
       'BLACK-THROATED SPARROW', 'BLACKBURNIAM WARBLER',
       'BLONDE CRESTED WOODPECKER', 'BLOOD PHEASANT', 'BLUE COAU',
       'BLUE DACNIS', 'BLUE GRAY GNATCATCHER', 'BLUE GROSBEAK',
       'BLUE GROUSE', 'BLUE HERON', 'BLUE MALKOHA',
       'BLUE THROATED PIPING GUAN', 'BLUE THROATED TOUCANET', 'BOBOLINK',
       'BORNEAN BRISTLEHEAD', 'BORNEAN LEAFBIRD', 'BORNEAN PHEASANT',
       'BRANDT CORMARANT', 'BREWERS BLACKBIRD', 'BROWN CREPPER',
       'BROWN HEADED COWBIRD', 'BROWN NOODY', 'BROWN THRASHER',
       'BUFFLEHEAD', 'BULWERS PHEASANT', 'BURCHELLS COURSER',
       'BUSH TURKEY', 'CAATINGA CACHOLOTE', 'CABOTS TRAGOPAN',
       'CACTUS WREN', 'CALIFORNIA CONDOR', 'CALIFORNIA GULL',
       'CALIFORNIA QUAIL', 'CAMPO FLICKER', 'CANARY', 'CANVASBACK',
       'CAPE GLOSSY STARLING', 'CAPE LONGCLAW', 'CAPE MAY WARBLER',
       'CAPE ROCK THRUSH', 'CAPPED HERON', 'CAPUCHINBIRD',
       'CARMINE BEE-EATER', 'CASPIAN TERN', 'CASSOWARY', 'CEDAR WAXWING',
       'CERULEAN WARBLER', 'CHARA DE COLLAR', 'CHATTERING LORY',
       'CHESTNET BELLIED EUPHONIA', 'CHESTNUT WINGED CUCKOO',
       'CHINESE BAMBOO PARTRIDGE', 'CHINESE POND HERON',
       'CHIPPING SPARROW', 'CHUCAO TAPACULO', 'CHUKAR PARTRIDGE',
       'CINNAMON ATTILA', 'CINNAMON FLYCATCHER', 'CINNAMON TEAL',
       'CLARKS GREBE', 'CLARKS NUTCRACKER', 'COCK OF THE  ROCK',
       'COCKATOO', 'COLLARED ARACARI', 'COLLARED CRESCENTCHEST',
       'COMMON FIRECREST', 'COMMON GRACKLE', 'COMMON HOUSE MARTIN',
       'COMMON IORA', 'COMMON LOON', 'COMMON POORWILL', 'COMMON STARLING',
       'COPPERSMITH BARBET', 'COPPERY TAILED COUCAL', 'CRAB PLOVER',
       'CRANE HAWK', 'CREAM COLORED WOODPECKER', 'CRESTED AUKLET',
       'CRESTED CARACARA', 'CRESTED COUA', 'CRESTED FIREBACK',
       'CRESTED KINGFISHER', 'CRESTED NUTHATCH', 'CRESTED OROPENDOLA',
       'CRESTED SERPENT EAGLE', 'CRESTED SHRIKETIT',
       'CRESTED WOOD PARTRIDGE', 'CRIMSON CHAT', 'CRIMSON SUNBIRD',
       'CROW', 'CUBAN TODY', 'CUBAN TROGON', 'CURL CRESTED ARACURI',
       'D-ARNAUDS BARBET', 'DALMATIAN PELICAN', 'DARJEELING WOODPECKER',
       'DARK EYED JUNCO', 'DAURIAN REDSTART', 'DEMOISELLE CRANE',
       'DOUBLE BARRED FINCH', 'DOUBLE BRESTED CORMARANT',
       'DOUBLE EYED FIG PARROT', 'DOWNY WOODPECKER', 'DUNLIN',
       'DUSKY LORY', 'DUSKY ROBIN', 'EARED PITA', 'EASTERN BLUEBIRD',
       'EASTERN BLUEBONNET', 'EASTERN GOLDEN WEAVER',
       'EASTERN MEADOWLARK', 'EASTERN ROSELLA', 'EASTERN TOWEE',
       'EASTERN WIP POOR WILL', 'EASTERN YELLOW ROBIN',
       'ECUADORIAN HILLSTAR', 'EGYPTIAN GOOSE', 'ELEGANT TROGON',
       'ELLIOTS  PHEASANT', 'EMERALD TANAGER', 'EMPEROR PENGUIN', 'EMU',
       'ENGGANO MYNA', 'EURASIAN BULLFINCH', 'EURASIAN GOLDEN ORIOLE',
       'EURASIAN MAGPIE', 'EUROPEAN GOLDFINCH', 'EUROPEAN TURTLE DOVE',
       'EVENING GROSBEAK', 'FAIRY BLUEBIRD', 'FAIRY PENGUIN',
       'FAIRY TERN', 'FAN TAILED WIDOW', 'FASCIATED WREN',
       'FIERY MINIVET', 'FIORDLAND PENGUIN', 'FIRE TAILLED MYZORNIS',
       'FLAME BOWERBIRD', 'FLAME TANAGER', 'FOREST WAGTAIL', 'FRIGATE',
       'FRILL BACK PIGEON', 'GAMBELS QUAIL', 'GANG GANG COCKATOO',
       'GILA WOODPECKER', 'GILDED FLICKER', 'GLOSSY IBIS', 'GO AWAY BIRD',
       'GOLD WING WARBLER', 'GOLDEN BOWER BIRD', 'GOLDEN CHEEKED WARBLER',
       'GOLDEN CHLOROPHONIA', 'GOLDEN EAGLE', 'GOLDEN PARAKEET',
       'GOLDEN PHEASANT', 'GOLDEN PIPIT', 'GOULDIAN FINCH', 'GRANDALA',
       'GRAY CATBIRD', 'GRAY KINGBIRD', 'GRAY PARTRIDGE', 'GREAT ARGUS',
       'GREAT GRAY OWL', 'GREAT JACAMAR', 'GREAT KISKADEE', 'GREAT POTOO',
       'GREAT TINAMOU', 'GREAT XENOPS', 'GREATER PEWEE',
       'GREATER PRAIRIE CHICKEN', 'GREATOR SAGE GROUSE',
       'GREEN BROADBILL', 'GREEN JAY', 'GREEN MAGPIE',
       'GREEN WINGED DOVE', 'GREY CUCKOOSHRIKE', 'GREY HEADED CHACHALACA',
       'GREY HEADED FISH EAGLE', 'GREY PLOVER', 'GROVED BILLED ANI',
       'GUINEA TURACO', 'GUINEAFOWL', 'GURNEYS PITTA', 'GYRFALCON',
       'HAMERKOP', 'HARLEQUIN DUCK', 'HARLEQUIN QUAIL', 'HARPY EAGLE',
       'HAWAIIAN GOOSE', 'HAWFINCH', 'HELMET VANGA', 'HEPATIC TANAGER',
       'HIMALAYAN BLUETAIL', 'HIMALAYAN MONAL', 'HOATZIN',
       'HOODED MERGANSER', 'HOOPOES', 'HORNED GUAN', 'HORNED LARK',
       'HORNED SUNGEM', 'HOUSE FINCH', 'HOUSE SPARROW', 'HYACINTH MACAW',
       'IBERIAN MAGPIE', 'IBISBILL', 'IMPERIAL SHAQ', 'INCA TERN',
       'INDIAN BUSTARD', 'INDIAN PITTA', 'INDIAN ROLLER',
       'INDIAN VULTURE', 'INDIGO BUNTING', 'INDIGO FLYCATCHER',
       'INLAND DOTTEREL', 'IVORY BILLED ARACARI', 'IVORY GULL', 'IWI',
       'JABIRU', 'JACK SNIPE', 'JACOBIN PIGEON', 'JANDAYA PARAKEET',
       'JAPANESE ROBIN', 'JAVA SPARROW', 'JOCOTOCO ANTPITTA', 'KAGU',
       'KAKAPO', 'KILLDEAR', 'KING EIDER', 'KING VULTURE', 'KIWI',
       'KNOB BILLED DUCK', 'KOOKABURRA', 'LARK BUNTING', 'LAUGHING GULL',
       'LAZULI BUNTING', 'LESSER ADJUTANT', 'LILAC ROLLER', 'LIMPKIN',
       'LITTLE AUK', 'LOGGERHEAD SHRIKE', 'LONG-EARED OWL',
       'LOONEY BIRDS', 'LUCIFER HUMMINGBIRD', 'MAGPIE GOOSE',
       'MALABAR HORNBILL', 'MALACHITE KINGFISHER', 'MALAGASY WHITE EYE',
       'MALEO', 'MALLARD DUCK', 'MANDRIN DUCK', 'MANGROVE CUCKOO',
       'MARABOU STORK', 'MASKED BOBWHITE', 'MASKED BOOBY',
       'MASKED LAPWING', 'MCKAYS BUNTING', 'MERLIN', 'MIKADO  PHEASANT',
       'MILITARY MACAW', 'MOURNING DOVE', 'MYNA', 'NICOBAR PIGEON',
       'NOISY FRIARBIRD', 'NORTHERN BEARDLESS TYRANNULET',
       'NORTHERN CARDINAL', 'NORTHERN FLICKER', 'NORTHERN FULMAR',
       'NORTHERN GANNET', 'NORTHERN GOSHAWK', 'NORTHERN JACANA',
       'NORTHERN MOCKINGBIRD', 'NORTHERN PARULA', 'NORTHERN RED BISHOP',
       'NORTHERN SHOVELER', 'OCELLATED TURKEY', 'OILBIRD', 'OKINAWA RAIL',
       'ORANGE BREASTED TROGON', 'ORANGE BRESTED BUNTING',
       'ORIENTAL BAY OWL', 'ORNATE HAWK EAGLE', 'OSPREY', 'OSTRICH',
       'OVENBIRD', 'OYSTER CATCHER', 'PAINTED BUNTING', 'PALILA',
       'PALM NUT VULTURE', 'PARADISE TANAGER', 'PARAKETT  AUKLET',
       'PARUS MAJOR', 'PATAGONIAN SIERRA FINCH', 'PEACOCK',
       'PEREGRINE FALCON', 'PHAINOPEPLA', 'PHILIPPINE EAGLE',
       'PINK ROBIN', 'PLUSH CRESTED JAY', 'POMARINE JAEGER', 'PUFFIN',
       'PUNA TEAL', 'PURPLE FINCH', 'PURPLE GALLINULE', 'PURPLE MARTIN',
       'PURPLE SWAMPHEN', 'PYGMY KINGFISHER', 'PYRRHULOXIA', 'QUETZAL',
       'RAINBOW LORIKEET', 'RAZORBILL', 'RED BEARDED BEE EATER',
       'RED BELLIED PITTA', 'RED BILLED TROPICBIRD', 'RED BROWED FINCH',
       'RED CROSSBILL', 'RED FACED CORMORANT', 'RED FACED WARBLER',
       'RED FODY', 'RED HEADED DUCK', 'RED HEADED WOODPECKER', 'RED KNOT',
       'RED LEGGED HONEYCREEPER', 'RED NAPED TROGON',
       'RED SHOULDERED HAWK', 'RED TAILED HAWK', 'RED TAILED THRUSH',
       'RED WINGED BLACKBIRD', 'RED WISKERED BULBUL', 'REGENT BOWERBIRD',
       'RING-NECKED PHEASANT', 'ROADRUNNER', 'ROCK DOVE',
       'ROSE BREASTED COCKATOO', 'ROSE BREASTED GROSBEAK',
       'ROSEATE SPOONBILL', 'ROSY FACED LOVEBIRD', 'ROUGH LEG BUZZARD',
       'ROYAL FLYCATCHER', 'RUBY CROWNED KINGLET',
       'RUBY THROATED HUMMINGBIRD', 'RUDDY SHELDUCK', 'RUDY KINGFISHER',
       'RUFOUS KINGFISHER', 'RUFOUS TREPE', 'RUFUOS MOTMOT',
       'SAMATRAN THRUSH', 'SAND MARTIN', 'SANDHILL CRANE',
       'SATYR TRAGOPAN', 'SAYS PHOEBE', 'SCARLET CROWNED FRUIT DOVE',
       'SCARLET FACED LIOCICHLA', 'SCARLET IBIS', 'SCARLET MACAW',
       'SCARLET TANAGER', 'SHOEBILL', 'SHORT BILLED DOWITCHER',
       'SMITHS LONGSPUR', 'SNOW GOOSE', 'SNOW PARTRIDGE', 'SNOWY EGRET',
       'SNOWY OWL', 'SNOWY PLOVER', 'SNOWY SHEATHBILL', 'SORA',
       'SPANGLED COTINGA', 'SPLENDID WREN', 'SPOON BILED SANDPIPER',
       'SPOTTED CATBIRD', 'SPOTTED WHISTLING DUCK', 'SQUACCO HERON',
       'SRI LANKA BLUE MAGPIE', 'STEAMER DUCK', 'STORK BILLED KINGFISHER',
       'STRIATED CARACARA', 'STRIPED OWL', 'STRIPPED MANAKIN',
       'STRIPPED SWALLOW', 'SUNBITTERN', 'SUPERB STARLING', 'SURF SCOTER',
       'SWINHOES PHEASANT', 'TAILORBIRD', 'TAIWAN MAGPIE', 'TAKAHE',
       'TASMANIAN HEN', 'TAWNY FROGMOUTH', 'TEAL DUCK', 'TIT MOUSE',
       'TOUCHAN', 'TOWNSENDS WARBLER', 'TREE SWALLOW',
       'TRICOLORED BLACKBIRD', 'TROPICAL KINGBIRD', 'TRUMPTER SWAN',
       'TURKEY VULTURE', 'TURQUOISE MOTMOT', 'UMBRELLA BIRD',
       'VARIED THRUSH', 'VEERY', 'VENEZUELIAN TROUPIAL', 'VERDIN',
       'VERMILION FLYCATHER', 'VICTORIA CROWNED PIGEON',
       'VIOLET BACKED STARLING', 'VIOLET CUCKOO', 'VIOLET GREEN SWALLOW',
       'VIOLET TURACO', 'VISAYAN HORNBILL', 'VULTURINE GUINEAFOWL',
       'WALL CREAPER', 'WATTLED CURASSOW', 'WATTLED LAPWING', 'WHIMBREL',
       'WHITE BREASTED WATERHEN', 'WHITE BROWED CRAKE',
       'WHITE CHEEKED TURACO', 'WHITE CRESTED HORNBILL',
       'WHITE EARED HUMMINGBIRD', 'WHITE NECKED RAVEN',
       'WHITE TAILED TROPIC', 'WHITE THROATED BEE EATER', 'WILD TURKEY',
       'WILLOW PTARMIGAN', 'WILSONS BIRD OF PARADISE', 'WOOD DUCK',
       'WOOD THRUSH', 'WOODLAND KINGFISHER', 'WRENTIT',
       'YELLOW BELLIED FLOWERPECKER', 'YELLOW BREASTED CHAT',
       'YELLOW CACIQUE', 'YELLOW HEADED BLACKBIRD', 'ZEBRA DOVE']
class CFG:
    model_name = 'efficientnet_b5'
    target_size = 525
    size = 224
    batch_size = 128
    epochs = 3
    num_workers = 2
    lr = 5e-4
    weight_decay = 1e-2
    train = True
    target_col = 'Class'

class CustomNet(nn.Module):
    def __init__(self, model_name=CFG.model_name, pretrained=False):
        super().__init__()
        self.model = timm.create_model(CFG.model_name, pretrained=pretrained)
        for params in self.model.parameters():
            params.requires_grad = False
        #print(self.model.default_cfg["classifier"])
        n_features = self.model.classifier.in_features #either fc or classifier , check using above line
        self.model.classifier = nn.Linear(n_features, CFG.target_size)     
        self.model.classifier.requires_grad = True 

    def forward(self, x):
        x = self.model(x)
        return x

def get_transforms(*, data):
    
    if data == 'train':
        return A.Compose([
            A.Resize(CFG.size, CFG.size),
            #A.RandomResizedCrop(CFG.size, CFG.size),
            A.HorizontalFlip(p=0.5),
            #A.VerticalFlip(p=0.5),
            A.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225],
            ),
            ToTensorV2(),
        ])

    elif data == 'valid':
        return A.Compose([
            A.Resize(CFG.size, CFG.size),
            A.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225],
            ),
            ToTensorV2(),
        ])

class TestDataset(Dataset):
    def _init_(self, df, transform=None):
        self.df = df
        self.file_names = df['path'].values
        self.transform = transform
        
    def _len_(self):
        return len(self.df)

    def _getitem_(self, idx):
        file_name = self.file_names[idx]
        file_path = file_name
        image = cv2.imread(file_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        if self.transform:
            augmented = self.transform(image=image)
            image = augmented['image']
        return image
def test_fun(img,model):
    model.eval()
    out=model(img)
    pred=List[torch.argmax(out)+1]
    return pred
test_transform=get_transforms(data="valid")

def predict(file_content,model):
    aug=test_transform(image=file_content)
    img=aug['image']
    img=img.reshape((1,3,224,224))
    pred = test_fun(img,model)
    return pred


# def response(pred):
#     @app.route('/api/data')
#     def get_time():
#         # Returning an api for showing in  reactjs
#         return {
#             "Name":pred,
#         }
    
check_point = torch.load(f'{CFG.model_name}_best.pth',map_location=torch.device('cpu'))
model = CustomNet(CFG.model_name, pretrained=True)
model.load_state_dict(check_point['model'])

@app.route('/url_route', methods=['POST'])
def upload_file():
    email = request.args.get('email')
    print(request.args.get('email'))
    d = {}
    try:
        file = request.files['file_from_react']
        filename = file.filename
        print(f"Uploading file {filename}")
        file_bytes = file.read()
        # print(file_bytes
        file_content = np.array(Image.open(io.BytesIO(file_bytes)))
        pred=predict(file_content,model)
        print(pred)
        # response(pred)
        print(": harsh")
        print(file)
        data = {
        "message":pred,
        }
        return jsonify(data)
        # result=predict_terrain(file_content)
        # result=result+1
        d['status'] = 1
        
    

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)

# @app.route('/url_route/pred')
# def show_topic(pred):
#     return '''<html><h1>The topic is %s</h1></html>''' % pred

# @app.route('/api/signup',methods = ['POST'])
# def signup():
#     return User().signup()

# @app.route('/api/data',methods = ['POST'])
# def get_data():
#     data = {
#         "message":"Hello this is api end point"
#     }
    # return jsonify(data)


@app.route('/api/signup',methods = ['POST'])
def signup():
    return User().signup()

@app.route('/api/signout',methods = ['GET'])
def signout():
    return User().signout()

@app.route('/api/data',methods = ['GET'])
def get_data():
    data = {
        "message":"Hello this is api end point"
    }
    return jsonify(data)

@app.route('/api/signin',methods = ['POST'])
def signin():
    return User().signin()

        # post = {"email" : email,"image" : base64_data}
        # if(db.posts.insert_one(post)):
        #     return jsonify({"response" : "ok inserted"})
        # return jsonify({"response" : "not inserted"})
        
        # d['status'] = 1

@app.route('/api/postCm',methods = ['POST'])
def postTheComment():
    email = request.args.get('email')
    pred = request.args.get('pred')
    img = request.args.get('img')
    comment = request.args.get('comment')
    print("---------------------------------------------------")
    print(pred)
    print("---------------------------------------------------")
    post = {"email" : email,"image" : img, "pred" : pred, "comment" : comment, "time" : datetime.now() }
    db.posts.insert_one(post)
    return "success"

class geeks:
    def __init__(self, email, img, pred, comment):
        self.email = email
        self.img = img
        self.pred = pred
        self.comment = comment


@app.route('/api/showpost', methods = ["get"])
def loadpost():
    email = request.args.get('email')
    x = []
    y = db.posts.find().sort([('time', -1)]).limit(12) #db.posts.find({"email" : email })#[0:4]
    for z in y:
        x.append(geeks(z["email"], z["image"], z["pred"], z["comment"]))
        print(z)
    print(x)
    response = Response(
        response=json.dumps([ob.__dict__ for ob in x]),
        status=200,
        mimetype='application/json'
    )
    return response
    


if __name__ == '__main__':
    app.run(host = '0.0.0.0', debug=True)