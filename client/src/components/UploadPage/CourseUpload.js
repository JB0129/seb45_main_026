import { styled } from "styled-components";
import {
  UploadTitle,
  UploadSubtitle,
  SubDescribe,
  RowBox,
  ColBox,
} from "../../pages/contents/UploadPage";
import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseUpload = () => {
  const imgRef = useRef();
  const videoRef = useRef();
  const [imgFile, setImgFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [uploadVideo, setUploadVideo] = useState({
    imageType: "",
    fileName: "",
  });
  const [uploadDetail, setUploadDetail] = useState({
    videoName: "",
    price: 0,
    description: "",
    categories: [],
  });
  const [presignedUrl, setPresignedUrl] = useState({
    thumbnailUrl: "",
    videoUrl: "",
  });

  const token = useSelector((state) => state.loginInfo.accessToken);

  console.log("uploadDetail", uploadDetail);
  console.log("uploadVideo", uploadVideo);

  const handleSaveFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file", file);

      const type = file.type;
      const [fileName, fileType] = file.name.split(".");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (type.includes("image")) {
          setImgFile(reader.result);
          setUploadVideo({ ...uploadVideo, imageType: fileType });
        } else if (type.includes("video")) {
          setVideoFile(reader.result);
          setUploadVideo({ ...uploadVideo, fileName });
          setUploadDetail({ ...uploadDetail, videoName: fileName });
        }
      };
    }
  };

  const handleBlurPrice = (price) => {
    const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    if (regExp.test(price)) {
      setUploadDetail({ ...uploadDetail, price: 0 });
      alert("숫자만 입력해주세요.");
    }
  };

  const handleVideoPost = () => {
    return axios
      .post("https://api.itprometheus.net/videos/presigned-url", uploadVideo, {
        headers: { Authorization: token.authorization },
      })
      .then((res) => {
        console.log(res.data.data);
        setPresignedUrl(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDetailPost = () => {
    return axios
      .post("https://api.itprometheus.net/videos", uploadDetail, {
        headers: { Authorization: token.authorization },
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleImgUpload = () => {
    return axios
      .put(`${presignedUrl.thumbnailUrl}`, imgRef.current.files[0], {
        headers: {
          "Content-type": "image/*",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleVideoUpload = () => {
    return axios
      .put(`${presignedUrl.videoUrl}`, videoRef.current.files[0], {
        headers: {
          "Content-type": "video/mp4",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <CourseBox>
      <UploadTitle>강의 등록하기</UploadTitle>
      <UploadSubtitle>강의 정보를 입력합니다.</UploadSubtitle>
      <ColBox>
        <RowBox>
          <CourseName>강의명</CourseName>
          <ChooseName
            type="text"
            placeholder="강의명은 영상 파일의 제목으로 업로드 됩니다."
            value={uploadDetail.videoName}
            disabled
          />
        </RowBox>
        <RowBox>
          <CourseIntro>강의 소개</CourseIntro>
          <ChooseIntro
            type="text"
            placeholder="강의 소개를 입력해 주세요."
            value={uploadDetail.description}
            onChange={(e) => {
              setUploadDetail({ ...uploadDetail, description: e.target.value });
            }}
          />
        </RowBox>
        <RowBox>
          <CourseCategory>가격</CourseCategory>
          <ChooseCategory
            type="text"
            placeholder="가격을 설정해 주세요."
            value={uploadDetail.price}
            onChange={(e) => {
              setUploadDetail({ ...uploadDetail, price: e.target.value });
            }}
            onBlur={(e) => handleBlurPrice(e.target.value)}
          />
        </RowBox>
        <RowBox>
          <CourseCategory>카테고리</CourseCategory>
          <ChooseCategory
            type="text"
            placeholder="카테고리를 선택해 주세요."
            value={uploadDetail.categories}
            onChange={(e) => {
              setUploadDetail({
                ...uploadDetail,
                categories: [e.target.value],
              });
            }}
          />
        </RowBox>

        <RowBox>
          <CourseImage>썸네일 이미지</CourseImage>
          <ColBox>
            <ChooseImageInupt
              id="imageUpload"
              type="file"
              accept="image/png image/jpg image/jpeg"
              onChange={handleSaveFile}
              ref={imgRef}
            />
            <ChooseImageBtn htmlFor="imageUpload">
              {imgFile ? (
                <ChooseImage src={imgFile} alt="프로필 이미지" />
              ) : (
                <ChooseSpan>썸네일을 등록해 주세요.</ChooseSpan>
              )}
            </ChooseImageBtn>
            <SubDescribe>
              썸네일 이미지는 png, jpg, jpeg만 등록이 가능합니다.
            </SubDescribe>
            <SubDescribe>권장 이미지 크기 : 291px &times; 212px</SubDescribe>
          </ColBox>
        </RowBox>

        <RowBox>
          <CourseVideo>강의 영상</CourseVideo>
          <ColBox>
            <ChooseVideo
              type="file"
              accept="video/mp4"
              onChange={handleSaveFile}
              ref={videoRef}
            />
            <SubDescribe>강의 영상은 mp4만 등록이 가능합니다.</SubDescribe>
            <SubDescribe>권장 화면 비율 : 1920 &times; 1080</SubDescribe>
            <SubDescribe>최대 영상 크기 : 1GB</SubDescribe>
          </ColBox>
        </RowBox>
        <button onClick={handleVideoPost}>프리사인드 링크 받기</button>
        <button onClick={handleDetailPost}>강의 업로드 하기</button>
        <button onClick={handleImgUpload}>S3에 이미지 배포하기</button>
        <button onClick={handleVideoUpload}>S3에 동영상 배포하기</button>
      </ColBox>
    </CourseBox>
  );
};

export default CourseUpload;

export const CourseBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
  max-width: 800px;
  padding: 20px;
`;

export const RegularLabel = styled.label`
  width: 100%;
  max-width: 100px;
  text-align: end;
  margin-top: 10px;
`;

export const CourseName = styled(RegularLabel)``;
export const CourseIntro = styled(RegularLabel)``;
export const CourseCategory = styled(RegularLabel)``;
export const CourseImage = styled(RegularLabel)``;
export const CourseVideo = styled(RegularLabel)``;

export const GrayInput = styled.input`
  border: 2px solid rgb(236, 236, 236);
  border-radius: 8px;
  margin-left: 15px;
  padding-left: 10px;
`;

export const ChooseName = styled(GrayInput)`
  width: 100%;
  max-width: 500px;
  height: 50px;
`;

export const ChooseIntro = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 100px;
  border: 2px solid rgb(236, 236, 236);
  border-radius: 8px;
  margin-left: 15px;
  padding: 10px 0px 0px 10px;
  resize: none;
`;

export const ChooseCategory = styled(GrayInput)`
  width: 100%;
  max-width: 240px;
  height: 50px;
`;

export const ChooseImageInupt = styled.input`
  display: none;
`;

export const ChooseImage = styled.img`
  width: 100%;
  height: 196px;
  max-width: 250px;
  border-radius: 8px;
  background-color: white;
  object-fit: scale-down;
`;

export const ChooseImageBtn = styled.label`
  width: 100%;
  height: 200px;
  max-width: 250px;
  border-radius: 8px;
  border: 2px solid rgb(236, 236, 236);
  background-color: rgb(230, 230, 230);
  margin: 0px 0px 10px 15px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

export const ChooseSpan = styled.span`
  color: rgb(120, 120, 120);
  text-align: center;
  font-size: 14px;
`;

export const ChooseVideo = styled(GrayInput)`
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
  padding-top: 10px;
  height: 50px;
`;
