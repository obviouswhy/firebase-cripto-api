# REST API Documentation

Base url -> `https://us-central1-critpto-project.cloudfunctions.net/app`

Routes -> `/mycoin` `/bluetok`

Frontend [Demo](https://critpto-project.web.app/)

# REST API

The REST API to the example app is described below.

## Get balance of MyCoin (MYC)

### Request

`GET /mycoin/get-balance?address=<ADDRESS>`

### Response

```json
{
  "balance": "10"
}
```

## Transfer MyCoin to another Address

### Request

`POST /mycoin/transfer`

```json
{
  "from": "0xEfe1b...",
  "senderPrivateKey": "ab5eaee26...",
  "to": "0x9e28a28...",
  "amount": "5"
}
```

### Response

```json
{
  "hash": "0xF3e5b..."
}
```

## Get BlueTok info

### Request

`GET /bluetok/get-info`

### Response

```json
{
  "name": "BlueTok",
  "symbol": "BTK",
  "contractAddress": "0xd26F1DD2eC1080477FE061E1368488a8Ed64AC72",
  "totalSupply": "2"
}
```

## Get number of BlueToks an address has

### Request

`GET /bluetok/get-balance?address=<ADDRESS>`

### Response

```json
{
  "balance": "1"
}
```

## Get ID of All BlueToks in an address

### Request

`GET /bluetok/get-balance?address=<ADDRESS>`

### Response

```json
{
  "tokens": ["0"]
}
```

## Get Metadata from a specific BlueTok

### Request

`GET /bluetok/get-metadata?id=<ID>`

### Response

```json
{
  "metadata": {
    "id": "1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui velit, molestie nec turpis sed, commodo commodo nunc.",
    "external_url": "http://serginogal.netlify.app/",
    "image": "https://i.imgur.com/YdHqxIJ.jpg",
    "name": "Screenshot 1",
    "attributes": [
      {
        "trait_type": "Foo",
        "value": "Bar"
      },
      {
        "trait_type": "Num Value",
        "value": 5
      },
      {
        "display_type": "boost_number",
        "trait_type": "Boost Number",
        "value": 20
      },
      {
        "display_type": "boost_percentage",
        "trait_type": "Boost Percentage",
        "value": 10
      }
    ]
  }
}
```
