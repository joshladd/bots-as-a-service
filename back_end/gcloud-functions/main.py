import yaml
import json
import requests
from google.cloud import storage
from kubernetes import client, config
from flask import make_response, jsonify
from google.cloud import container_v1


def local_activate_bot(request):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('deployment-yaml')
    blob = bucket.blob('deployment.yaml')
    contents = blob.download_as_string()
    dep = yaml.safe_load(contents)
    print("YAML\n", dep)

    config.load_kube_config('config')

    k8s_apps_v1 = client.AppsV1Api()
    resp = k8s_apps_v1.create_namespaced_deployment(
        body=dep, namespace="default")
    print("Deployment created. status='%s'" % resp.metadata.name)


def deploy_bot_with_yaml(request):

    json_data = request.get_json(force=True)
    bot = json_data.get('bot-name')
    config = json_data.get('yaml')

    if bot == None:
        return jsonify({'result':'fail','message':'no valid bot'})
    if config == None:
        return jsonify({'result':'fail','message':'no valid config'})

    try:
        """Upload a file to the bucket."""
        storage_client = storage.Client()
        bucket_name = "deployment-yaml"
        bucket = storage_client.bucket(bucket_name)        
        blob = bucket.blob(bot)
        blob.upload_from_string(json.dumps(config))

        return make_response(jsonify({'result': 'ok', 'message':'bot {} created'.format(bot)}), 200)

    except Exception as error:
        print('Fail to set configuration: {}'.format(str(error)))
        return jsonify({'result':'fail','message':'{}'.format(str(error))})

def alternative(request):
    client = container_v1.ClusterManagerClient()

    # create_cluster

    project_id = 'bots-as-a-service'
    zone = 'us-west1-a'

    response = client.list_clusters(project_id, zone)
    return response.attributes


########################
    # In Use Functions 
########################

def deactivate_bot(request):

    if request.args and 'bot-name' in request.args:
        bot_name = request.args.get('bot-name')
    
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
        except:
            return make_response(jsonify({'error': 'Cannot find bot to delete'}), 500)
    else:
        return make_response(jsonify({'error': 'bot-name must be in args'}), 400)

def activate_bot(request):

    if request.args and 'bot-name' in request.args:
        bot_name = request.args.get('bot-name')

        print('Activating Bot {}'.format(bot_name))

        storage_client = storage.Client()
        bucket = storage_client.get_bucket('deployment-yaml')

        bot_yaml = str.format(bot_name)+'.yaml'

        try:
            blob = bucket.blob(bot_yaml)
            contents = blob.download_as_string()
            dep = yaml.safe_load(contents)
            config.load_kube_config('config')
            k8s_apps_v1 = client.AppsV1Api()
            resp = k8s_apps_v1.create_namespaced_deployment(
                body=dep, namespace="default")
            
            status = "Deployment created. status: '{}".format(resp.metadata.name)
            return make_response(jsonify({'message': status}), 200)

        except:
            return make_response(jsonify({'error': 'Cannot fetch bot configuration file'}), 500)
    else:
        return make_response(jsonify({'error': 'bot-name must be in args'}), 400)



def configure_bot(request):

    json_data = request.get_json(force=True)
    bot = json_data.get('bot-name')
    config = json_data.get('config')

    if bot == None:
        return jsonify({'result':'fail','message':'no valid bot'})
    if config == None:
        return jsonify({'result':'fail','message':'no valid config'})

    try:
        """Upload a file to the bucket."""
        storage_client = storage.Client()
        bucket_name = "bot-configurations"
        bucket = storage_client.bucket(bucket_name)        
        blob = bucket.blob(bot)
        blob.upload_from_string(json.dumps(config))

        return make_response(jsonify({'result': 'ok', 'message':'bot {} configured'.format(bot)}), 200)

    except Exception as error:
        print('Fail to set configuration: {}'.format(str(error)))
        return jsonify({'result':'fail','message':'{}'.format(str(error))})



def register_bot(request):

    if request.args and 'bot-name' in request.args:
        bot_name = request.args.get('bot-name')

        storage_client = storage.Client()
        bucket = storage_client.get_bucket('deployment-yaml')

        try:
            """Upload a file to the bucket."""
            bot_name = '{}'.format(request.args.get('bot-name'))
            yaml_template = {"apiVersion": "apps/v1", "kind": "Deployment", "metadata": {"name": bot_name}, "spec": {"selector": {"matchLabels": {"app": bot_name}}, "replicas": 1, "template": {"metadata": {"labels": {"app": bot_name}}, "spec": {"containers": [{"name": "application", "image": "index.docker.io/kamiarcoffey/bots-as-a-service:"+bot_name, "imagePullPolicy": "Always", "ports": [{"containerPort": 5000}]}]}}}}
            storage_client = storage.Client()
            bucket_name = "deployment-yaml"
            bucket = storage_client.bucket(bucket_name)        
            blob = bucket.blob(bot_name)
            blob.upload_from_string(json.dumps(yaml_template))

            return make_response(jsonify({'result': 'ok', 'message':'bot {} registered'.format(bot_name)}), 200)

        except Exception as e:
            return make_response(jsonify({'error': e}), 500)
    else:
        return make_response(jsonify({'error': 'bot-name must be in args'}), 400)



def test_register_bot(URL):
    response = requests.post(url=URL)
    print("Response Status", response)
    if (response.status_code == requests.codes.ok):
        print("Reponse", response.json())

def test_configure_bot(URL):
    
    headers = {
        'Content-Type': 'application/json',
        }

    with open('bot_configuration.json') as file:
        config = json.load(file)
        bot = 'TEST'
        payload = json.dumps({"bot-name": bot, "config":config})
        response = requests.post(url=URL, headers=headers, data=payload)
        print("Response Status", response)
        if (response.status_code == requests.codes.ok):
            print("Reponse", response.json())

def test_activate_bot(URL):
    response = requests.post(url=URL+'/?bot-name=deployment')
    print("Response Status", response)
    if (response.status_code == requests.codes.ok):
        print("Reponse", response.json())

if __name__ == '__main__':

    test_register_bot('https://us-central1-bots-as-a-service.cloudfunctions.net/register_bot/?bot-name=test')
    # test_configure_bot('https://us-central1-bots-as-a-service.cloudfunctions.net/configure_bot')
    # test_activate_bot('https://us-central1-bots-as-a-service.cloudfunctions.net/activate_bot')