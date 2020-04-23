# def register_bot(request):

#     if request.args and 'bot-name' in request.args:
#         bot_name = request.args.get('bot-name')

#         storage_client = storage.Client()
#         bucket = storage_client.get_bucket('deployment-yaml')

#         try:
#             """Upload a file to the bucket."""
#             bot_name = '{}'.format(request.args.get('bot-name'))
#             yaml_template = {"apiVersion": "apps/v1", "kind": "Deployment", "metadata": {"name": bot_name}, "spec": {"selector": {"matchLabels": {"app": bot_name}}, "replicas": 1, "template": {"metadata": {"labels": {"app": bot_name}}, "spec": {"containers": [{"name": "application", "image": "index.docker.io/kamiarcoffey/bots-as-a-service:"+bot_name, "imagePullPolicy": "Always", "ports": [{"containerPort": 5000}]}]}}}}
#             storage_client = storage.Client()
#             bucket_name = "deployment-yaml"
#             bucket = storage_client.bucket(bucket_name)        
#             blob = bucket.blob(bot_name)
#             blob.upload_from_string(json.dumps(yaml_template))

#             return make_response(jsonify({'result': 'ok', 'message':'bot {} registered'.format(bot_name)}), 200)

#         except Exception as e:
#             return make_response(jsonify({'error': e}), 500)
#     else:
#         return make_response(jsonify({'error': 'bot-name must be in args'}), 400)


# def local_activate_bot(request):
#     storage_client = storage.Client()
#     bucket = storage_client.get_bucket('deployment-yaml')
#     blob = bucket.blob('deployment.yaml')
#     contents = blob.download_as_string()
#     dep = yaml.safe_load(contents)
#     print("YAML\n", dep)

#     config.load_kube_config('config')

#     k8s_apps_v1 = client.AppsV1Api()
#     resp = k8s_apps_v1.create_namespaced_deployment(
#         body=dep, namespace="default")
#     print("Deployment created. status='%s'" % resp.metadata.name)


# def deploy_bot_with_yaml(request):

#     json_data = request.get_json(force=True)
#     bot = json_data.get('bot-name')
#     config = json_data.get('yaml')

#     if bot == None:
#         return jsonify({'result':'fail','message':'no valid bot'})
#     if config == None:
#         return jsonify({'result':'fail','message':'no valid config'})

#     try:
#         """Upload a file to the bucket."""
#         storage_client = storage.Client()
#         bucket_name = "deployment-yaml"
#         bucket = storage_client.bucket(bucket_name)        
#         blob = bucket.blob(bot)
#         blob.upload_from_string(json.dumps(config))

#         return make_response(jsonify({'result': 'ok', 'message':'bot {} created'.format(bot)}), 200)

#     except Exception as error:
#         print('Fail to set configuration: {}'.format(str(error)))
#         return jsonify({'result':'fail','message':'{}'.format(str(error))})

# def alternative(request):
#     client = container_v1.ClusterManagerClient()

#     # create_cluster

#     project_id = 'bots-as-a-service'
#     zone = 'us-west1-a'

#     response = client.list_clusters(project_id, zone)
#     return response.attributes


# ########################
#     # Helper Functions 
# ########################

# def generate_yaml(bot_name):

#     storage_client = storage.Client()
#     bucket = storage_client.get_bucket('deployment-yaml')

#     try:
#         """Upload a file to the bucket."""
#         yaml_template = {"apiVersion": "apps/v1", "kind": "Deployment", "metadata": {"name": bot_name}, "spec": {"selector": {"matchLabels": {"app": bot_name}}, "replicas": 1, "template": {"metadata": {"labels": {"app": bot_name}}, "spec": {"containers": [{"name": "application", "image": "index.docker.io/kamiarcoffey/bots-as-a-service:"+bot_name, "imagePullPolicy": "Always", "ports": [{"containerPort": 5000}]}]}}}}
#         storage_client = storage.Client()
#         bucket_name = "deployment-yaml"
#         bucket = storage_client.bucket(bucket_name)        
#         blob = bucket.blob(bot_name)
#         blob.upload_from_string(json.dumps(yaml_template))

#         return True

#     except:
#         return False


# def test_deactivate_bot(bot_name):

#     try:
#         config.load_kube_config('config')
#         k8s_apps_v1 = client.AppsV1Api()
#         api_response = k8s_apps_v1.delete_namespaced_deployment(
#             name=bot_name,
#             namespace="default",
#             body=client.V1DeleteOptions(
#                 propagation_policy='Foreground',
#                 grace_period_seconds=5))
#         print("Deployment deleted. status='%s'" % str(api_response.status))
#     except Exception as e:
#         print(e)
