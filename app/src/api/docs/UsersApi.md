# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMeUsersMeGet**](#getmeusersmeget) | **GET** /users/me | Get Me|
|[**updateMeUsersMePatch**](#updatemeusersmepatch) | **PATCH** /users/me | Update Me|

# **getMeUsersMeGet**
> UserOut getMeUsersMeGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getMeUsersMeGet(
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**UserOut**

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

# **updateMeUsersMePatch**
> UserOut updateMeUsersMePatch(userUpdate)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UserUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userUpdate: UserUpdate; //
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.updateMeUsersMePatch(
    userUpdate,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userUpdate** | **UserUpdate**|  | |
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**UserOut**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
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

