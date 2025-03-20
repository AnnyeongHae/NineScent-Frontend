import axios from 'axios';

Axios 인스턴스 생성
const api = axios.create({
    baseURL: '/api', // 프록시 경로와 일치
    headers: {
        'Content-Type': 'application/json',
    },
});


export default {
  //    모든 상품 조회
  async getItems() {
    try {
      const { data } = await api.get('/items');
      return data;
    } catch (error) {
      console.error('Failed to load item list:', error.response?.data || error.message);
      throw error;
    }
  },

  //    특정 상품 조회
  async getItemById(id) {
    try {
      const { data } = await api.get(`/items/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to load item (ID: ${id}):`, error.response?.data || error.message);
      throw error;
    }
  },

  //    상품 추가 (FormData 사용)
  async addItem(itemDTO, mainImage, detailImages = []) {
    try {
      const formData = new FormData();

      // ItemDTO 데이터를 FormData에 추가
      Object.keys(itemDTO).forEach((key) => {
        formData.append(key, itemDTO[key]);
      });

      // 메인 이미지 추가
      if (mainImage) {
        formData.append('mainImage', mainImage);
      }

      // 상세 이미지 추가
      detailImages.forEach((image, index) => {
        formData.append('detailImages', image);
      });

      const { data } = await api.post('/items/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data;
    } catch (error) {
      console.error('Failed to add item:', error.response?.data || error.message);
      throw error;
    }
  },

  //    상품 수정
  async updateItem(id, item) {
    try {
      const { data } = await api.put(`/items/${id}`, item);
      return data;
    } catch (error) {
      console.error(`Failed to update item (ID: ${id}):`, error.response?.data || error.message);
      throw error;
    }
  },

  //    상품 삭제
  async deleteItem(id) {
    try {
      await api.delete(`/items/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`Failed to delete item (ID: ${id}):`, error.response?.data || error.message);
      throw error;
    }
  },

  async recommendItem() {
    try {
      const { data } = await api.get(`/items/recommend`);
      console.log('recommended item :', data);
      return data;
    } catch (error) {
      console.error('Failed to load recommend item', error.response.data);
    }
  },
};
