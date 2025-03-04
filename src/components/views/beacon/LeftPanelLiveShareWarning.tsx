/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import classNames from 'classnames';
import React from 'react';

import { useEventEmitterState } from '../../../hooks/useEventEmitter';
import { _t } from '../../../languageHandler';
import { OwnBeaconStore, OwnBeaconStoreEvent } from '../../../stores/OwnBeaconStore';
import { Icon as LiveLocationIcon } from '../../../../res/img/location/live-location.svg';

interface Props {
    isMinimized?: boolean;
}

const LeftPanelLiveShareWarning: React.FC<Props> = ({ isMinimized }) => {
    const isMonitoringLiveLocation = useEventEmitterState(
        OwnBeaconStore.instance,
        OwnBeaconStoreEvent.MonitoringLivePosition,
        () => OwnBeaconStore.instance.isMonitoringLiveLocation,
    );

    if (!isMonitoringLiveLocation) {
        return null;
    }

    return <div
        className={classNames('mx_LeftPanelLiveShareWarning', {
            'mx_LeftPanelLiveShareWarning__minimized': isMinimized,
        })}
        title={isMinimized ? _t('You are sharing your live location') : undefined}
    >
        { isMinimized ? <LiveLocationIcon height={10} /> : _t('You are sharing your live location') }
    </div>;
};

export default LeftPanelLiveShareWarning;
