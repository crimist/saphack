import httpx

id = 'leo'
endpoint = 'http://localhost:1337'

client = httpx.Client()

r = client.get(endpoint+'/user/me/dashboard', headers={"Id": "leo"})
print(r.status_code, r.text)

r = client.get(endpoint+'/demo')
print(r.status_code, r.text)

r = client.get(endpoint+'/user/me/dashboard', headers={"Id": "leo"})
print(r.status_code, r.text)
