import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'; // استيراد الأدوات
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// 2. ده الـ Component اللي هيراقب النت "لحظياً"
export default function NetworkMonitor() {
    const qc = useQueryClient();

    useEffect(() => {
        const handleOnline = () => {
            // أول ما النت يرجع، بنخلي كل الـ Queries "قديمة" عشان يسحب الجديد فوراً
            qc.invalidateQueries();
            toast.success('تم استعادة الاتصال.. جاري تحديث البيانات', { icon: '🌐' });
        };

        const handleOffline = () => {
            toast.error('انقطع الاتصال بالإنترنت', { id: 'offline' });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [qc]);

    return null; // الـ Component ده مش بيعرض حاجة في الصفحة، هو شغال في الخلفية بس
}