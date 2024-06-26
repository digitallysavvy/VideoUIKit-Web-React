import React, { useContext, useState } from 'react'
import RtcContext from './RtcContext'
import { LocalUser, RemoteUser, useRemoteUsers } from 'agora-rtc-react'
import RemoteVideoMute from './Controls/Remote/RemoteVideoMute'
import RemoteAudioMute from './Controls/Remote/RemoteAudioMute'
import SwapUser from './Controls/SwapUser'
import PropsContext, { LocalUIKitUser, UIKitUser } from './PropsContext'
import VideoPlaceholder from './VideoPlaceholder'

/**
 * React context to expose user array displayed in the smaller view
 */
const MinVideoView = (props: { user: UIKitUser }) => {
  // const { mediaStore } = useContext(RtcContext)
  const { localVideoTrack, localAudioTrack } = useContext(RtcContext)
  const { styleProps, rtcProps } = useContext(PropsContext)
  const { minViewStyles, minViewOverlayContainer } = styleProps || {}
  const [isShown, setIsShown] = useState(false)
  const { user } = props
  const remoteUsers = useRemoteUsers()

  const isLocalUser = (user: UIKitUser): user is LocalUIKitUser => user.uid === 0

  return (
    <div
      style={{
        ...{ display: 'flex', flex: 1 },
        ...minViewStyles
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {user.hasVideo === 1 ? (
        <div
          style={{
            ...{
              display: 'flex',
              flex: 1,
              position: 'relative'
            }
          }}
        >
          {isLocalUser(user) ? (
            <LocalUser
              videoTrack={localVideoTrack} 
              audioTrack={localAudioTrack}
              cameraOn
              micOn
              playAudio
              playVideo
              style={{ flex: 10, display: 'flex' }}
            />
          ) : (
            <RemoteUser 
              user={remoteUsers.find(remoteUser => remoteUser.uid === user.uid)}
              style={{ flex: 10, display: 'flex' }}
            />
          )}
          {/* <AgoraVideoPlayer
            style={{ flex: 10, display: 'flex' }}
            config={{
              fit: renderModeProp !== undefined ? renderModeProp : 'cover'
            }}
            videoTrack={mediaStore[user.uid].videoTrack as IRemoteVideoTrack}
          /> */}
          {isShown && (
            <div
              style={{
                ...{
                  margin: 4,
                  position: 'absolute',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                },
                ...minViewOverlayContainer
              }}
            >
              {!rtcProps.disableRtm && <RemoteVideoMute UIKitUser={user} />}
              {!rtcProps.disableRtm && <RemoteAudioMute UIKitUser={user} />}
              <SwapUser UIKitUser={user} />
            </div>
          )}
        </div>
      ) : (
        <VideoPlaceholder user={user} isShown={isShown} showButtons showSwap />
      )}
    </div>
  )
}

export default MinVideoView
