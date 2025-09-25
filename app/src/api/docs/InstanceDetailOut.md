# InstanceDetailOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**user_id** | **number** |  | [default to undefined]
**bot_id** | **number** |  | [default to undefined]
**instance_id** | **string** |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**config** | **object** |  | [default to undefined]
**status** | [**InstanceStatus**](InstanceStatus.md) |  | [default to undefined]
**kb** | [**KnowledgeBaseOut**](KnowledgeBaseOut.md) |  | [optional] [default to undefined]

## Example

```typescript
import { InstanceDetailOut } from './api';

const instance: InstanceDetailOut = {
    id,
    user_id,
    bot_id,
    instance_id,
    title,
    config,
    status,
    kb,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
