import yaml
import json
import requests
import time
from google.cloud import storage
from kubernetes import client, config
from flask import make_response, jsonify
from google.cloud import container_v1


########################
    # In Use Functions 
########################

def deactivate_bot(request):

    if request.args and 'id' in request.args:
        bot_name = request.args.get('id')
    
        try:
            config.load_kube_config('config')
            k8s_apps_v1 = client.AppsV1Api()
            resp = k8s_apps_v1.delete_namespaced_deployment(
                name=bot_name,
                namespace="default",
                body=client.V1DeleteOptions(
                    propagation_policy='Foreground',
                    grace_period_seconds=5))

            status = "Deployment Deleted. status: '{}".format(resp.metadata.name)
            return make_response(jsonify({'message': status}), 200)

        except Exception as e:
            return make_response(jsonify({'error': e}), 500)
    else:
        return make_response(jsonify({'error': 'id must be in args'}), 400)


def activate_bot(request):

    if request.args and 'id' in request.args:
        bot_name = request.args.get('id')

        storage_client = storage.Client()
        bucket = storage_client.get_bucket('deployment-yaml')

        bot_yaml = str.format(bot_name)

        try:
            blob = bucket.blob(bot_yaml)
            contents = blob.download_as_string()
            dep = yaml.safe_load(contents)
            config.load_kube_config('config')
            k8s_apps_v1 = client.AppsV1Api()
            resp = k8s_apps_v1.create_namespaced_deployment(
                body=dep, 
                namespace="default")
            
            status = "Deployment created. status: {}".format(resp.metadata.name)
            return make_response(jsonify({'message': status}), 200)

        except Exception as e:
            return make_response(jsonify({'error': e}), 500)
    else:
        return make_response(jsonify({'error': 'id must be in args'}), 400)

def get_bots(request):
    try:
        bucket_name = 'bot-configurations'
        storage_client = storage.Client()
        bucket = storage_client.get_bucket(bucket_name)
        blobs = storage_client.list_blobs(bucket_name)

        response_list = [blob.download_as_string() for blob in blobs]
        
        return make_response(jsonify({'bots': response_list}), 200)
        

    except KeyError as e:
        return make_response(jsonify({'cant find any bots': str(e)}), 400)
    except:
        make_response(jsonify({'error': 'Something really bad happened. Probably the database is down'}), 400)



def create_bot(request):

    json_data = request.get_json(force=True)
    bot_name = json_data.get('bot-name') # explicitly pass the name - used for YAML should be independent from config format
    config = json_data.get('config')

    if config == None:
        return jsonify({'result':'fail','message':'no valid config'})

    if bot_name == None:
        return jsonify({'result':'fail','message':'no valid name'})
    
    bot_id = bot_name
    # uuid here

    try:
        """Upload a file to the bucket."""
        storage_client = storage.Client()
        bucket_name = "bot-configurations"
        bucket = storage_client.bucket(bucket_name)        
        blob = bucket.blob(bot_id)
        blob.upload_from_string(json.dumps(config))

        """Upload a file to the bucket."""
        yaml_template = {"apiVersion": "apps/v1", "kind": "Deployment", "metadata": {"name": bot_name}, "spec": {"selector": {"matchLabels": {"app": bot_name}}, "replicas": 1, "template": {"metadata": {"labels": {"app": bot_name}}, "spec": {"containers": [{"name": "application", "image": "index.docker.io/kamiarcoffey/bots-as-a-service:"+bot_name, "imagePullPolicy": "Always", "ports": [{"containerPort": 5000}]}]}}}}
        yaml_bucket = storage_client.bucket("deployment-yaml")        
        blob1 = yaml_bucket.blob(bot_id)
        blob1.upload_from_string(json.dumps(yaml_template))

        return make_response(jsonify({'result': 'ok', 'message':{'id':'{}'.format(bot_id)}}), 200)


    except Exception as error:
        print('Fail to set configuration: {}'.format(str(error)))
        return jsonify({'result':'fail','message':'{}'.format(str(error))})




########################
    # Tests
########################

def test_get_bots():
    try:
        bucket_name = 'bot-configurations'
        storage_client = storage.Client()
        bucket = storage_client.get_bucket(bucket_name)
        blobs = storage_client.list_blobs(bucket_name)

        response_list = [blob.download_as_string() for blob in blobs]
        
        print({'bots': response_list})
        

    except KeyError as e:
        print(str(e))
    except Exception as e:
        print(str(e))
        

def test_create_bot():

    URL = 'https://us-central1-bots-as-a-service.cloudfunctions.net/create_bot'
    
    headers = {
        'Content-Type': 'application/json',
        }

    with open('bot_configuration.json') as file:
        config = json.load(file)
        bot = 'hello-python'
        payload = json.dumps({"bot-name": bot, "config":config})
        response = requests.post(url=URL, headers=headers, data=payload)
        print("Response Status", response)
        if (response.status_code == requests.codes.ok):
            print("Reponse", response.json())

def test_activate_bot():

    URL = 'https://us-central1-bots-as-a-service.cloudfunctions.net/activate_bot'
    response = requests.post(url=URL+'/?id=hello-python')
    print("Response Status", response)
    if (response.status_code == requests.codes.ok):
        print("Reponse", response.json())

def test_deactivate_bot():

    URL = 'https://us-central1-bots-as-a-service.cloudfunctions.net/deactivate_bot'
    response = requests.post(url=URL+'/?id=hello-python')
    print("Response Status", response)
    if (response.status_code == requests.codes.ok):
        print("Reponse", response.json())

def test_deactivate_bot_local(bot_name):

    try:
        config.load_kube_config('config')
        k8s_apps_v1 = client.AppsV1Api()
        api_response = k8s_apps_v1.delete_namespaced_deployment(
            name=bot_name,
            namespace="default",
            body=client.V1DeleteOptions(
                propagation_policy='Foreground',
                grace_period_seconds=5))
        print("Deployment deleted. status='%s'" % str(api_response.status))
    except Exception as e:
        print(e)

if __name__ == '__main__':

    # test_deactivate_bot_local('hello-python')

    test_get_bots()
    # test_create_bot()
    # test_activate_bot()
    # time.sleep(60)
    # test_deactivate_bot()