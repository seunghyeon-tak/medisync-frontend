import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC, {
    type IAgoraRTCClient,
    type ICameraVideoTrack,
    type IMicrophoneAudioTrack,
    type IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import { AGORA_APP_ID } from "../api/config";

function CallPage() {
    const { appointmentId, callType } = useParams<{ appointmentId: string; callType: string }>();

    const clientRef = useRef<IAgoraRTCClient | null>(null);
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRef = useRef<HTMLDivElement>(null);

    const [isJoined, setIsJoined] = useState(false);
    const [isVideoCall] = useState(callType?.toUpperCase() === "VIDEO");

    const localTracksRef = useRef<{
        audioTrack: IMicrophoneAudioTrack | null;
        videoTrack: ICameraVideoTrack | null;
    }>({ audioTrack: null, videoTrack: null });

    const handleJoin = async () => {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            if (mediaType === "video") {
                const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
                remoteVideoTrack.play(remoteVideoRef.current!);
            }
            if (mediaType === "audio") {
                user.audioTrack?.play();
            }
        });

        // TODO: 테스트용 임시 토큰 - 백엔드 토큰 서버 붙이면 교체 필요
        const TEMP_TOKEN = "007eJxTYDBNmLA689mTw1mNkaZu10Ok6kU/LVm6yX/9vcxpsopu8SUKDBaJacYGSYlJKSlJBibJhqmWRkbJiYYmhompSYamQJaj2oSshkBGhuleTAyMUAjiMzIYMjAAAPfyHWQ=";

        await client.join(AGORA_APP_ID, appointmentId!, TEMP_TOKEN, null);

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        let videoTrack: ICameraVideoTrack | null = null;

        if (isVideoCall) {
            videoTrack = await AgoraRTC.createCameraVideoTrack();
            videoTrack.play(localVideoRef.current!);
        }

        localTracksRef.current = { audioTrack, videoTrack };

        const tracksToPublish = videoTrack ? [audioTrack, videoTrack] : [audioTrack];
        await client.publish(tracksToPublish);

        setIsJoined(true);
    };

    const handleLeave = async () => {
        const { audioTrack, videoTrack } = localTracksRef.current;
        audioTrack?.close();
        videoTrack?.close();

        await clientRef.current?.leave();
        clientRef.current = null;
        localTracksRef.current = { audioTrack: null, videoTrack: null };
        setIsJoined(false);
    };

    useEffect(() => {
        return () => {
            handleLeave();
        };
    }, []);

    return (
        <div>
            <h1>{isVideoCall ? "영상통화" : "음성통화"} - 예약 #{appointmentId}</h1>

            <div ref={localVideoRef} style={{ width: 320, height: 240, background: "#000" }} />
            <div ref={remoteVideoRef} style={{ width: 320, height: 240, background: "#000" }} />

            {!isJoined ? (
                <button onClick={handleJoin}>통화 시작</button>
            ) : (
                <button onClick={handleLeave}>통화 종료</button>
            )}
        </div>
    );
}

export default CallPage;
