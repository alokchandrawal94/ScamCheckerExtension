# from sklearn.externals import joblib
import joblib
import boto
from boto.s3.key import Key
from boto.s3.connection import S3Connection
from flask import Flask
from flask import request
from flask import json
import numpy as np
from sklearn import svm
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix,f1_score
from flask_cors import CORS, cross_origin

# https://ratmbucket.s3.us-east-2.amazonaws.com/Instagram_Research/ScamChecker.pkl

BUCKET_NAME = 'ratmbucket'
MODEL_FILE_NAME = 'ScamChecker.pkl'
# MODEL_LOCAL_PATH = '/Instagram_Research/' + MODEL_FILE_NAME
MODEL_LOCAL_PATH = 'tmp/' + MODEL_FILE_NAME


app = Flask(__name__)

@app.route('/', methods=['POST'])
@cross_origin()
CORS(app)
def index():
  payload = json.loads(request.get_data().decode('utf-8'))
  prediction = predict(payload['payload'])
  data = {}
  l = prediction.flatten()
  l = l.tolist()
  data['data'] = l
  #data['data'] = prediction[-1]
  return json.dumps(data)

def load_model():
  infile = open('ScamChecker_LR.pkl','rb')
  return joblib.load(infile)

    
  
def predict(data):

  an_array = np.array(data, dtype=float)
  temp = np.reshape(an_array, (1, 21))
  final_formatted_data = temp
  #return load_model().predict(final_formatted_data)
  return load_model().predict_proba(final_formatted_data)



