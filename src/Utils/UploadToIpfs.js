import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
const projectId = `${process.env.REACT_APP_IPFS_PROJECT_ID}`;
const projectSecret = `${process.env.REACT_APP_IPFS_PROJECT_SECRET}`;

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
        authorization: auth,
    },
})

export const UploadToIPFS = async (file) => {

    const result = await ipfs.add(file);
    if (result.path) {
        const hash = result.path;
        return { success: true, data: { hash } };

    }
    else {
        return { success: false, data: {} }
    }

};
