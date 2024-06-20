import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from 'react-dropzone';
import { User, Storage } from '../../api';
import { defaultUser } from '../../assets';
import '../../scss/AvatarUpdate.scss';

const user = new User();
const storage = new Storage();

export function AvatarUpdate() { 

    const { photoURL, uid } = user.getMe();

    const [avatarUrl, setAvatar] = useState(photoURL || defaultUser);

    const onDrop = useCallback ( async ( acceptedFiles) => {
        const file = acceptedFiles[0];
        setAvatar(URL.createObjectURL(file));

        const response = await storage.uploadFile(file, 'avatar', uid);
        const url = await storage.getUrlFile(response.metadata.fullPath);
        await user.updateAvatarUser(url);
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="avatar-update" { ...getRootProps() }>
            <input { ...getInputProps() } />
            <Image src= { avatarUrl } />
        </div>

    );
}