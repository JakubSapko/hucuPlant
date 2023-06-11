import { Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";
import { API } from "../../services/api";
import { PlantKeys } from "../../services/api";

const PlantFormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
    gap: 2rem;
`;

const PlantForm = styled(Form)`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

// const getBase64 = (img: any, callback: any) => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
// };

// const beforeUpload = (file: any) => {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

//     if (!isJpgOrPng) {
//         message.error("You can only upload JPG/PNG file!");
//     }

//     const isLt2M = file.size / 1024 / 1024 < 2;

//     if (!isLt2M) {
//         message.error("Image must smaller than 2MB!");
//     }

//     return isJpgOrPng && isLt2M;
// };

export const NewPlantSite: React.FC = () => {
    // const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState<string>();

    // const handleChange = (info: any) => {
    //     if (info.file.status === "uploading") {
    //         setLoading(true);
    //         return;
    //     }

    //     if (info.file.status === "done") {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, (url: string) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };

    // const uploadButton = (
    //     <div>
    //         {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div
    //             style={{
    //                 marginTop: 8,
    //             }}
    //         >
    //             Upload
    //         </div>
    //     </div>
    // );
    const onFinish = (values: any) => {
        const plant = {
            name: values.name,
            description: values.description,
        };

        API.post(PlantKeys.BASE, plant);
    };
    return (
        <PlantFormContainer>
            <h1>Add a new plant to your collection!</h1>
            <PlantForm onFinish={onFinish}>
                <Form.Item label="Plant Name">
                    <Input placeholder="Plant Name" />
                </Form.Item>
                <Form.Item label="Plant Description">
                    <Input placeholder="Plant Description" />
                </Form.Item>
                {/* <Form.Item label="Plant Image">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Plant
                    </Button>
                </Form.Item>
            </PlantForm>
        </PlantFormContainer>
    );
};
