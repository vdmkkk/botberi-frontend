# InstancesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createInstanceInstancesPost**](#createinstanceinstancespost) | **POST** /instances | Create Instance|
|[**deleteInstanceInstancesIidDelete**](#deleteinstanceinstancesiiddelete) | **DELETE** /instances/{iid} | Delete Instance|
|[**getInstanceInstancesIidGet**](#getinstanceinstancesiidget) | **GET** /instances/{iid} | Get Instance|
|[**getInstanceStatsInstancesIidStatsGet**](#getinstancestatsinstancesiidstatsget) | **GET** /instances/{iid}/stats | Get Instance Stats|
|[**getStatusEventsInstancesIidStatusEventsGet**](#getstatuseventsinstancesiidstatuseventsget) | **GET** /instances/{iid}/status-events | Get Status Events|
|[**kbAddEntryInstancesIidKbEntriesPost**](#kbaddentryinstancesiidkbentriespost) | **POST** /instances/{iid}/kb/entries | Kb Add Entry|
|[**kbDeleteEntryRouteInstancesIidKbEntriesEntryIdDelete**](#kbdeleteentryrouteinstancesiidkbentriesentryiddelete) | **DELETE** /instances/{iid}/kb/entries/{entry_id} | Kb Delete Entry Route|
|[**listInstancesInstancesGet**](#listinstancesinstancesget) | **GET** /instances | List Instances|
|[**setInstanceStatusInstancesIidStatusPatch**](#setinstancestatusinstancesiidstatuspatch) | **PATCH** /instances/{iid}/status | Set Instance Status|
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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**422** | Unprocessable Entity |  -  |
|**429** | Too Many Requests |  -  |
|**500** | Internal Server Error |  -  |

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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**422** | Unprocessable Entity |  -  |
|**429** | Too Many Requests |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getInstanceInstancesIidGet**
> InstanceDetailOut getInstanceInstancesIidGet()


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

**InstanceDetailOut**

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

# **getInstanceStatsInstancesIidStatsGet**
> StatusStatsOut getInstanceStatsInstancesIidStatsGet()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let from: string; // (default to undefined)
let to: string; // (default to undefined)
let includeSegments: boolean; // (optional) (default to false)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getInstanceStatsInstancesIidStatsGet(
    iid,
    from,
    to,
    includeSegments,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **from** | [**string**] |  | defaults to undefined|
| **to** | [**string**] |  | defaults to undefined|
| **includeSegments** | [**boolean**] |  | (optional) defaults to false|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StatusStatsOut**

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

# **getStatusEventsInstancesIidStatusEventsGet**
> Array<StatusEventOut> getStatusEventsInstancesIidStatusEventsGet()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let limit: number; // (optional) (default to 100)
let offset: number; // (optional) (default to 0)
let from: string; // (optional) (default to undefined)
let to: string; // (optional) (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getStatusEventsInstancesIidStatusEventsGet(
    iid,
    limit,
    offset,
    from,
    to,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 100|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **from** | [**string**] |  | (optional) defaults to undefined|
| **to** | [**string**] |  | (optional) defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<StatusEventOut>**

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

# **kbAddEntryInstancesIidKbEntriesPost**
> KBEntryOut kbAddEntryInstancesIidKbEntriesPost(kBEntryCreate)


### Example

```typescript
import {
    InstancesApi,
    Configuration,
    KBEntryCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let kBEntryCreate: KBEntryCreate; //
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.kbAddEntryInstancesIidKbEntriesPost(
    iid,
    kBEntryCreate,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **kBEntryCreate** | **KBEntryCreate**|  | |
| **iid** | [**number**] |  | defaults to undefined|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|
| **xRefreshToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**KBEntryOut**

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

# **kbDeleteEntryRouteInstancesIidKbEntriesEntryIdDelete**
> any kbDeleteEntryRouteInstancesIidKbEntriesEntryIdDelete()


### Example

```typescript
import {
    InstancesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let entryId: number; // (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.kbDeleteEntryRouteInstancesIidKbEntriesEntryIdDelete(
    iid,
    entryId,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iid** | [**number**] |  | defaults to undefined|
| **entryId** | [**number**] |  | defaults to undefined|
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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**422** | Unprocessable Entity |  -  |
|**429** | Too Many Requests |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **setInstanceStatusInstancesIidStatusPatch**
> InstanceOut setInstanceStatusInstancesIidStatusPatch(instanceStatusUpdate)


### Example

```typescript
import {
    InstancesApi,
    Configuration,
    InstanceStatusUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new InstancesApi(configuration);

let iid: number; // (default to undefined)
let instanceStatusUpdate: InstanceStatusUpdate; //
let xAdminToken: string; // (optional) (default to undefined)
let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.setInstanceStatusInstancesIidStatusPatch(
    iid,
    instanceStatusUpdate,
    xAdminToken,
    xSessionToken,
    xRefreshToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **instanceStatusUpdate** | **InstanceStatusUpdate**|  | |
| **iid** | [**number**] |  | defaults to undefined|
| **xAdminToken** | [**string**] |  | (optional) defaults to undefined|
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
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**409** | Conflict |  -  |
|**422** | Unprocessable Entity |  -  |
|**429** | Too Many Requests |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

