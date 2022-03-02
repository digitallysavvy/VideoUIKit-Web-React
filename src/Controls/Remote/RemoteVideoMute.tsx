import React, { useContext } from 'react'
import BtnTemplate from '../BtnTemplate'
import PropsContext, { remoteTrackState, UIKitUser } from '../../PropsContext'
import RtmContext, { mutingDevice } from '../../RtmContext'

function RemoteVideoMute(props: { UIKitUser: UIKitUser }) {
  const { styleProps } = useContext(PropsContext)
  const { sendMuteRequest } = useContext(RtmContext)
  const { remoteBtnStyles } = styleProps || {}
  const { muteRemoteVideo } = remoteBtnStyles || {}
  const { UIKitUser } = props
  const isDisabled = UIKitUser.hasVideo === remoteTrackState.no

  return UIKitUser.uid !== 0 ? (
    <div>
      <BtnTemplate
        name={
          UIKitUser.hasVideo === remoteTrackState.subbed
            ? 'videocam'
            : 'videocamOff'
        }
        style={muteRemoteVideo}
        disabled={isDisabled}
        onClick={() =>
          isDisabled ? {} : sendMuteRequest(mutingDevice.camera, UIKitUser.uid)
        }
      />
    </div>
  ) : null
}

export default RemoteVideoMute
