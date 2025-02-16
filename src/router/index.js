import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import Home from '@/pages/Home.vue';
import Login from '@/pages/member/Login.vue';
import Signup from '@/pages/member/Signup.vue';
import FindId from '@/pages/member/FindId.vue';
import FindPw from '@/pages/member/FindPw.vue';

import Checkout from '@/pages/Checkout.vue';
import Address from '@/pages/Address.vue';
import AddAddress from '@/pages/AddAddress.vue';
import UpdateAddress from '@/pages/UpdateAddress.vue';
import CSCenter from '@/pages/CSCenter.vue';
import AddFaq from '@/pages/AddFaq.vue';

import MyPage from '@/pages/MyPage.vue';
// import Category from '@/pages/Category.vue';
// import ProductDetail from '@/pages/ProductDetail.vue';
import Cart from '@/pages/CartPage.vue';
import OrderComplete from '@/pages/OrderComplete.vue';
// import OrderComplete from '@/pages/OrderComplete.vue';

const routes = [
    // { path: '/category/:id', component: Category },
    // { path: '/product/:id', component: ProductDetail },
    // { path: '/order-complete', component: OrderComplete },

    {
        path: '/',
        name: 'home',
        component: Home,
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
    },

    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },

    {
        path: '/findId',
        name: 'FindId',
        component: FindId,
    },

    {
        path: '/findPw',
        name: 'FindPw',
        component: FindPw,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
    },

    {
        path: '/complete',
        name: 'OrderComplete',
        component: OrderComplete,
    },

    {
        path: '/address/:userNo',
        name: 'Address',
        component: Address,
    },
    {
        path: '/addaddress',
        name: 'AddAddress',
        component: AddAddress,
    },
    {
        path: '/updateaddress/:addrNo',
        name: 'UpdateAddress',
        component: UpdateAddress,
    },
    {
        path: '/cscenter',
        name: 'CSCenter',
        component: CSCenter,
    },
    {
        path: '/faq/add',
        name: 'AddFaq',
        component: AddFaq,
    },
    {
        path: '/faq/update/:faqId',
        name: 'UpdateFaq',
        component: AddFaq,
    },

    {
        path: '/mypage/:id',
        name: 'MyPage',
        component: MyPage,
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
                next('/login');
            } else if (to.params.id !== authStore.userId) {
                // URL의 ID와 로그인된 사용자의 ID가 다를 경우 수정
                next(`/mypage/${authStore.userId}`);
            } else {
                next(); // 정상적으로 MyPage로 이동
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // 저장된 토큰을 불러와 인증 상태를 유지
    if (!authStore.isAuthenticated) {
        authStore.loadStoredToken();
    }

    // 인증이 필요한 페이지 (예: MyPage)
    const requiresAuth = to.matched.some((record) => record.path.startsWith('/mypage'));

    if (requiresAuth && !authStore.isAuthenticated) {
        // 인증이 필요한 페이지에 접근했지만 로그인되지 않은 경우
        return next('/login');
    }

    next();
});

export default router;
