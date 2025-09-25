# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changePasswordAuthChangePasswordPost**](#changepasswordauthchangepasswordpost) | **POST** /auth/change-password | Change Password|
|[**forgotPasswordAuthForgotPasswordPost**](#forgotpasswordauthforgotpasswordpost) | **POST** /auth/forgot-password | Forgot Password|
|[**loginAuthLoginPost**](#loginauthloginpost) | **POST** /auth/login | Login|
|[**logoutAuthLogoutPost**](#logoutauthlogoutpost) | **POST** /auth/logout | Logout|
|[**refreshAuthRefreshPost**](#refreshauthrefreshpost) | **POST** /auth/refresh | Refresh|
|[**registerAuthRegisterPost**](#registerauthregisterpost) | **POST** /auth/register | Register|
|[**resetPasswordAuthResetPasswordPost**](#resetpasswordauthresetpasswordpost) | **POST** /auth/reset-password | Reset Password|
|[**verifyEmailAuthVerifyEmailPost**](#verifyemailauthverifyemailpost) | **POST** /auth/verify-email | Verify Email|

# **changePasswordAuthChangePasswordPost**
> TokenPair changePasswordAuthChangePasswordPost(changePasswordIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ChangePasswordIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let changePasswordIn: ChangePasswordIn; //
let xSessionToken: any; // (optional) (default to undefined)

const { status, data } = await apiInstance.changePasswordAuthChangePasswordPost(
    changePasswordIn,
    xSessionToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordIn** | **ChangePasswordIn**|  | |
| **xSessionToken** | **any** |  | (optional) defaults to undefined|


### Return type

**TokenPair**

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

# **forgotPasswordAuthForgotPasswordPost**
> Message forgotPasswordAuthForgotPasswordPost(forgotPasswordIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ForgotPasswordIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let forgotPasswordIn: ForgotPasswordIn; //

const { status, data } = await apiInstance.forgotPasswordAuthForgotPasswordPost(
    forgotPasswordIn
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordIn** | **ForgotPasswordIn**|  | |


### Return type

**Message**

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

# **loginAuthLoginPost**
> TokenPair loginAuthLoginPost(loginIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginIn: LoginIn; //

const { status, data } = await apiInstance.loginAuthLoginPost(
    loginIn
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginIn** | **LoginIn**|  | |


### Return type

**TokenPair**

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

# **logoutAuthLogoutPost**
> Message logoutAuthLogoutPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let xSessionToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.logoutAuthLogoutPost(
    xSessionToken
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **xSessionToken** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Message**

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

# **refreshAuthRefreshPost**
> TokenPair refreshAuthRefreshPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let xSessionToken: string; // (optional) (default to undefined)
let xRefreshToken: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.refreshAuthRefreshPost(
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

**TokenPair**

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

# **registerAuthRegisterPost**
> Message registerAuthRegisterPost(registerIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    RegisterIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let registerIn: RegisterIn; //

const { status, data } = await apiInstance.registerAuthRegisterPost(
    registerIn
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerIn** | **RegisterIn**|  | |


### Return type

**Message**

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

# **resetPasswordAuthResetPasswordPost**
> Message resetPasswordAuthResetPasswordPost(resetPasswordIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ResetPasswordIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let resetPasswordIn: ResetPasswordIn; //

const { status, data } = await apiInstance.resetPasswordAuthResetPasswordPost(
    resetPasswordIn
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordIn** | **ResetPasswordIn**|  | |


### Return type

**Message**

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

# **verifyEmailAuthVerifyEmailPost**
> TokenPair verifyEmailAuthVerifyEmailPost(verifyEmailIn)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    VerifyEmailIn
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let verifyEmailIn: VerifyEmailIn; //

const { status, data } = await apiInstance.verifyEmailAuthVerifyEmailPost(
    verifyEmailIn
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **verifyEmailIn** | **VerifyEmailIn**|  | |


### Return type

**TokenPair**

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

