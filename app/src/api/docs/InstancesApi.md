# InstancesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createInstanceInstancesPost**](#createinstanceinstancespost) | **POST** /instances | Create Instance|
|[**deleteInstanceInstancesIidDelete**](#deleteinstanceinstancesiiddelete) | **DELETE** /instances/{iid} | Delete Instance|
|[**getInstanceInstancesIidGet**](#getinstanceinstancesiidget) | **GET** /instances/{iid} | Get Instance|
|[**listInstancesInstancesGet**](#listinstancesinstancesget) | **GET** /instances | List Instances|
|[**pauseInstanceInstancesIidPausePatch**](#pauseinstanceinstancesiidpausepatch) | **PATCH** /instances/{iid}/pause | Pause Instance|
|[**resumeInstanceInstancesIidResumePatch**](#resumeinstanceinstancesiidresumepatch) | **PATCH** /instances/{iid}/resume | Resume Instance|
|[**updateInstanceInstancesIidPut**](#updateinstanceinstancesiidput) | **PUT** /instances/{iid} | Update Instance|

# **createInstanceInstancesPost**
> InstanceOut createInstanceInstancesPost(instanceCreate)


### Example

```typescript
import {
    InstancesApi,
    Configuration,
    InstanceCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let instanceCreate: InstanceCreate; //
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.createInstanceInstancesPost(
    instanceCreate,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **instanceCreate** | **InstanceCreate**|  | |
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**InstanceOut**

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

# **deleteInstanceInstancesIidDelete**
> any deleteInstanceInstancesIidDelete()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.deleteInstanceInstancesIidDelete(
    iid,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


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

# **getInstanceInstancesIidGet**
> InstanceOut getInstanceInstancesIidGet()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getInstanceInstancesIidGet(
    iid,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**InstanceOut**

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

# **listInstancesInstancesGet**
> Array<InstanceOut> listInstancesInstancesGet()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listInstancesInstancesGet(
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

**Array<InstanceOut>**

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

# **pauseInstanceInstancesIidPausePatch**
> InstanceOut pauseInstanceInstancesIidPausePatch()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.pauseInstanceInstancesIidPausePatch(
    iid,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**InstanceOut**

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

# **resumeInstanceInstancesIidResumePatch**
> InstanceOut resumeInstanceInstancesIidResumePatch()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.resumeInstanceInstancesIidResumePatch(
    iid,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**InstanceOut**

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

# **updateInstanceInstancesIidPut**
> InstanceOut updateInstanceInstancesIidPut(instanceUpdate)


### Example

```typescript
import {
    InstancesApi,
    Configuration,
    InstanceUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let instanceUpdate: InstanceUpdate; //
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.updateInstanceInstancesIidPut(
    iid,
    instanceUpdate,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **instanceUpdate** | **InstanceUpdate**|  | |
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**InstanceOut**

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

