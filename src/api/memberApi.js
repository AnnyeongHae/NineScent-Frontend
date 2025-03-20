import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: '/api', // 프록시 경로와 일치
    headers: {
        'Content-Type': 'application/json',
    },
});

// 아이디 중복 검사
export const checkUsername = async (username) => {
    try {
        const response = await api.get(`/user/checkusername/${username}`);
        return response.data; // 중복 여부 반환
    } catch (error) {
        console.error('아이디 중복 검사 오류:', error);
        throw error;
    }
};

// 이메일 중복 검사
export const checkEmail = async (email) => {
    try {
        const response = await api.get(`/user/checkemail/${email}`);
        return response.data; // 중복 여부 반환
    } catch (error) {
        console.error('이메일 중복 검사 오류:', error);
        throw error;
    }
};

// 회원가입 요청
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/join', userData);
        return response.data;
    } catch (error) {
        console.error('회원가입 오류:', error);
        throw error;
    }
};

// 로그인 요청
// export const loginUser = async (loginData) => {
//     try {
//         const response = await api.post('/auth/login', loginData);
//         return response.data;
//     } catch (error) {
//         console.error('로그인 오류:', error);
//         throw error;
//     }
// };
export const loginUser = async (loginData) => {
    try {
        const response = await api.post('/auth/login', loginData);

        return response; // data만 반환
    } catch (error) {
        console.error('로그인 오류:', error.response ? error.response.data : error);
        throw error;
    }
};

// 로그아웃 요청 (서버에서 토큰 무효화 가능)
export const logoutUser = async () => {
    try {
        await api.post('/auth/logout'); // 백엔드에서 세션 무효화 가능
    } catch (error) {
        console.error('로그아웃 오류:', error);
    }
};

// 비밀번호 찾기 요청
export const findPassword = async (email) => {
    try {
        const response = await api.post('/user/find-password', { email });
        return response.data;
    } catch (error) {
        console.error('비밀번호 찾기 오류:', error);
        throw error;
    }
};

// 아이디 찾기 요청
export const findUsername = async (email) => {
    try {
        const response = await api.post('/user/find-id', { email });
        return response.data;
    } catch (error) {
        console.error('아이디 찾기 오류:', error);
        throw error;
    }
};

// 주소 검색 (다음 주소 API)
export const searchAddress = async (address) => {
    try {
        const response = await api.get(`/user/search-address/${address}`);
        return response.data;
    } catch (error) {
        console.error('주소 검색 오류:', error);
        throw error;
    }
};
