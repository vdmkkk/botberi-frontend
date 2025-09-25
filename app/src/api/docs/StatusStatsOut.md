# StatusStatsOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**window_start** | **string** |  | [default to undefined]
**window_end** | **string** |  | [default to undefined]
**total_seconds** | **number** |  | [default to undefined]
**seconds_by_status** | **{ [key: string]: number; }** |  | [default to undefined]
**uptime_seconds** | **number** |  | [default to undefined]
**uptime_percent** | **number** |  | [default to undefined]
**segments** | [**Array&lt;StatusSegmentOut&gt;**](StatusSegmentOut.md) |  | [optional] [default to undefined]

## Example

```typescript
import { StatusStatsOut } from './api';

const instance: StatusStatsOut = {
    window_start,
    window_end,
    total_seconds,
    seconds_by_status,
    uptime_seconds,
    uptime_percent,
    segments,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
