# BotsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createBotBotsPost**](#createbotbotspost) | **POST** /bots | Create Bot|
|[**deleteBotBotsBotIdDelete**](#deletebotbotsbotiddelete) | **DELETE** /bots/{bot_id} | Delete Bot|
|[**listBotsBotsGet**](#listbotsbotsget) | **GET** /bots | List Bots|
|[**updateBotBotsBotIdPut**](#updatebotbotsbotidput) | **PUT** /bots/{bot_id} | Update Bot|

# **createBotBotsPost**
> BotOut createBotBotsPost(botCreate)


### Example

```typescript
import {
    BotsApi,
    Configuration,
    BotCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new BotsApi(configuration);

let botCreate: BotCreate; //
let xAdminKey: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.createBotBotsPost(
    botCreate,
    xAdminKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **botCreate** | **BotCreate**|  | |
| **xAdminKey** | [**string**] |  | (optional) defaults to undefined|


### Return type

**BotOut**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteBotBotsBotIdDelete**
> any deleteBotBotsBotIdDelete()


### Example

```typescript
import {
    BotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BotsApi(configuration);

let botId: number; // (default to undefined)
let xAdminKey: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.deleteBotBotsBotIdDelete(
    botId,
    xAdminKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **botId** | [**number**] |  | defaults to undefined|
| **xAdminKey** | [**string**] |  | (optional) defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listBotsBotsGet**
> Array<BotOut> listBotsBotsGet()


### Example

```typescript
import {
    BotsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BotsApi(configuration);

const { status, data } = await apiInstance.listBotsBotsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<BotOut>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**422** | Unprocessable Entity |  -  |
|**429** | Too Many Requests |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBotBotsBotIdPut**
> BotOut updateBotBotsBotIdPut(botUpdate)


### Example

```typescript
import {
    BotsApi,
    Configuration,
    BotUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new BotsApi(configuration);

let botId: number; // (default to undefined)
let botUpdate: BotUpdate; //
let xAdminKey: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.updateBotBotsBotIdPut(
    botId,
    botUpdate,
    xAdminKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **botUpdate** | **BotUpdate**|  | |
| **botId** | [**number**] |  | defaults to undefined|
| **xAdminKey** | [**string**] |  | (optional) defaults to undefined|


### Return type

**BotOut**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

