'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Package,
    Plus,
    Edit2,
    Trash2,
    Search,
    BarChart3,
    TrendingUp,
    ShoppingCart,
    Users,
    X,
    Save,
    Tag,
    ChevronRight,
    ImageUp,
    Loader2,
    Link2,
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { productService } from '@/services/productService';
import { categoryService, CategoryDTO } from '@/services/categoryService';
import { Product, ProductDTO, Category } from '@/types';
import { formatPrice } from '@/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import ToastContainer from '@/components/ui/ToastContainer';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import Card, { CardHeader } from '@/components/ui/Card';

const EMPTY_PRODUCT_DTO: ProductDTO = {
    name: '',
    description: '',
    material: '',
    price: 0,
    categoryId: 0,
    imageUrls: [],
};

const EMPTY_CATEGORY_DTO: CategoryDTO = {
    name: '',
    description: '',
};

type AdminTab = 'products' | 'categories';

export default function AdminPage() {
    const router = useRouter();
    const { isAdmin, isLoading: authLoading } = useAuth();
    const { products, isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
    const { categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
    const { toasts, show, dismiss } = useToast();

    const [activeTab, setActiveTab] = useState<AdminTab>('products');
    const [search, setSearch] = useState('');

    // ----- Product modal state -----
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState<ProductDTO>(EMPTY_PRODUCT_DTO);
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSavingProduct, setIsSavingProduct] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

    // ----- Category modal state -----
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryForm, setCategoryForm] = useState<CategoryDTO>(EMPTY_CATEGORY_DTO);
    const [isSavingCategory, setIsSavingCategory] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

    // Auth guard
    if (!authLoading && !isAdmin) {
        router.push('/login');
        return null;
    }

    // =================== PRODUCT HANDLERS ===================

    const openCreateProduct = () => {
        setEditingProduct(null);
        setProductForm({ ...EMPTY_PRODUCT_DTO, categoryId: categories[0]?.id ?? 0 });
        setImageUrlInput('');
        setIsProductModalOpen(true);
    };

    const openEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description,
            material: product.material,
            price: product.price,
            categoryId: product.categoryId,
            imageUrls: product.imageUrls || [],
        });
        setImageUrlInput('');
        setIsProductModalOpen(true);
    };

    const closeProductModal = () => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        setProductForm(EMPTY_PRODUCT_DTO);
    };

    const handleSaveProduct = async () => {
        if (!productForm.name.trim()) {
            show('Vui lòng nhập tên sản phẩm', 'error');
            return;
        }
        if (!productForm.categoryId) {
            show('Vui lòng chọn danh mục', 'error');
            return;
        }
        setIsSavingProduct(true);
        try {
            if (editingProduct) {
                await productService.update(editingProduct.id, productForm);
                show('Cập nhật sản phẩm thành công!', 'success');
            } else {
                await productService.create(productForm);
                show('Tạo sản phẩm thành công!', 'success');
            }
            closeProductModal();
            refetchProducts();
        } catch {
            show('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        } finally {
            setIsSavingProduct(false);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
        setDeletingProductId(id);
        try {
            await productService.delete(id);
            show('Xóa sản phẩm thành công!', 'success');
            refetchProducts();
        } catch {
            show('Không thể xóa sản phẩm. Vui lòng thử lại.', 'error');
        } finally {
            setDeletingProductId(null);
        }
    };

    const addImageUrl = () => {
        if (imageUrlInput.trim()) {
            setProductForm((p) => ({ ...p, imageUrls: [...p.imageUrls, imageUrlInput.trim()] }));
            setImageUrlInput('');
        }
    };

    const removeImageUrl = (idx: number) => {
        setProductForm((p) => ({ ...p, imageUrls: p.imageUrls.filter((_, i) => i !== idx) }));
    };

    const handleImageFileChange = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setIsUploadingImage(true);
        try {
            const uploadPromises = Array.from(files).map((file) => productService.uploadImage(file));
            const urls = await Promise.all(uploadPromises);
            setProductForm((p) => ({ ...p, imageUrls: [...p.imageUrls, ...urls] }));
            show(`Đã tải lên ${urls.length} ảnh thành công!`, 'success');
        } catch {
            show('Lỗi khi tải ảnh. Vui lòng thử lại.', 'error');
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleImageFileChange(e.dataTransfer.files);
    };

    // =================== CATEGORY HANDLERS ===================

    const openCreateCategory = () => {
        setEditingCategory(null);
        setCategoryForm(EMPTY_CATEGORY_DTO);
        setIsCategoryModalOpen(true);
    };

    const openEditCategory = (cat: Category) => {
        setEditingCategory(cat);
        setCategoryForm({ name: cat.name, description: cat.description });
        setIsCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalOpen(false);
        setEditingCategory(null);
        setCategoryForm(EMPTY_CATEGORY_DTO);
    };

    const handleSaveCategory = async () => {
        if (!categoryForm.name.trim()) {
            show('Vui lòng nhập tên danh mục', 'error');
            return;
        }
        setIsSavingCategory(true);
        try {
            if (editingCategory) {
                await categoryService.update(editingCategory.id, categoryForm);
                show('Cập nhật danh mục thành công!', 'success');
            } else {
                await categoryService.create(categoryForm);
                show('Tạo danh mục thành công!', 'success');
            }
            closeCategoryModal();
            refetchCategories();
        } catch {
            show('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        } finally {
            setIsSavingCategory(false);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm('Bạn có chắc muốn xóa danh mục này? Các sản phẩm thuộc danh mục này sẽ không thể xóa nếu còn tồn tại.')) return;
        setDeletingCategoryId(id);
        try {
            await categoryService.delete(id);
            show('Xóa danh mục thành công!', 'success');
            refetchCategories();
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Không thể xóa danh mục. Có thể vẫn còn sản phẩm trong danh mục này.';
            show(msg, 'error');
        } finally {
            setDeletingCategoryId(null);
        }
    };

    // =================== DERIVED ===================

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.categoryName?.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCategories = categories.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: 'Sản Phẩm', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Danh Mục', value: categories.length, icon: Tag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Đơn Hàng', value: '—', icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Khách Hàng', value: '—', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <>
            <ToastContainer toasts={toasts} dismiss={dismiss} />

            <div className="min-h-screen bg-[#f8f4ef]">
                {/* Admin Header Bar */}
                <div className="bg-[#1a1a2e] text-white sticky top-[72px] z-30 shadow-md">
                    <div className="section-container py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center">
                                <BarChart3 size={16} className="text-[#1a1a2e]" />
                            </div>
                            <div>
                                <h1 className="font-display text-lg font-bold">Bảng Quản Trị</h1>
                                <p className="text-white/50 text-xs">VẢI VIỆT Admin Dashboard</p>
                            </div>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
                            <button
                                id="tab-products"
                                onClick={() => setActiveTab('products')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'products'
                                    ? 'bg-[#c9a84c] text-[#1a1a2e]'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                <Package size={14} /> Sản Phẩm
                            </button>
                            <button
                                id="tab-categories"
                                onClick={() => setActiveTab('categories')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'categories'
                                    ? 'bg-[#c9a84c] text-[#1a1a2e]'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                <Tag size={14} /> Danh Mục
                            </button>
                        </div>

                        {activeTab === 'products' ? (
                            <Button variant="primary" size="sm" onClick={openCreateProduct} id="admin-create-product-btn">
                                <Plus size={15} /> Thêm Sản Phẩm
                            </Button>
                        ) : (
                            <Button variant="primary" size="sm" onClick={openCreateCategory} id="admin-create-category-btn">
                                <Plus size={15} /> Thêm Danh Mục
                            </Button>
                        )}
                    </div>
                </div>

                <div className="section-container py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        {stats.map((s) => (
                            <Card key={s.label} padding="md" className="!hover:-translate-y-0 !hover:shadow-none">
                                <div className="flex items-center gap-4">
                                    <div className={`w-11 h-11 rounded-2xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                                        <s.icon size={20} className={s.color} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#8a8a9a] font-medium">{s.label}</p>
                                        <p className="font-display font-bold text-xl text-[#1a1a2e] leading-tight">
                                            {s.value}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* =================== PRODUCTS TABLE =================== */}
                    {activeTab === 'products' && (
                        <Card padding="none">
                            <div className="p-6 border-b border-[#e8e4df]">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <CardHeader
                                        title="Quản Lý Sản Phẩm"
                                        subtitle={`${products.length} sản phẩm trong kho`}
                                        className="!mb-0"
                                    />
                                    <div className="relative">
                                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
                                        <input
                                            id="admin-search-input"
                                            type="search"
                                            placeholder="Tìm sản phẩm..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="input-base !pl-9 !py-2 text-sm !w-56"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#f8f4ef]">
                                            {['#', 'Sản Phẩm', 'Danh Mục', 'Chất Liệu', 'Giá', 'Thao Tác'].map((h) => (
                                                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-[#8a8a9a] uppercase tracking-wide">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f0ebe4]">
                                        {productsLoading ? (
                                            Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={6} />)
                                        ) : productsError ? (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-10 text-center text-[#8a8a9a]">
                                                    {productsError}
                                                </td>
                                            </tr>
                                        ) : filteredProducts.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-10 text-center text-[#8a8a9a]">
                                                    Không tìm thấy sản phẩm
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredProducts.map((p) => (
                                                <tr key={p.id} className="hover:bg-[#fdfaf5] transition-colors group" id={`admin-row-${p.id}`}>
                                                    <td className="px-5 py-4 text-[#8a8a9a] font-mono text-xs">{p.id}</td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {p.imageUrls?.[0] && (
                                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f0ebe4] flex-shrink-0">
                                                                    <img
                                                                        src={p.imageUrls[0]}
                                                                        alt={p.name}
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=60'; }}
                                                                    />
                                                                </div>
                                                            )}
                                                            <p className="font-semibold text-[#1a1a2e] line-clamp-1">{p.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <Badge variant="gold" className="!text-xs">{p.categoryName}</Badge>
                                                    </td>
                                                    <td className="px-5 py-4 text-[#5a5a6a]">{p.material || '—'}</td>
                                                    <td className="px-5 py-4 font-display font-bold text-[#c9a84c]">
                                                        {formatPrice(p.price)}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                id={`admin-edit-${p.id}`}
                                                                onClick={() => openEditProduct(p)}
                                                                className="p-2 rounded-lg text-[#8a8a9a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4] transition-all"
                                                                title="Chỉnh sửa"
                                                            >
                                                                <Edit2 size={15} />
                                                            </button>
                                                            <button
                                                                id={`admin-delete-${p.id}`}
                                                                onClick={() => handleDeleteProduct(p.id)}
                                                                disabled={deletingProductId === p.id}
                                                                className="p-2 rounded-lg text-[#8a8a9a] hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                                                                title="Xóa"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {/* =================== CATEGORIES TABLE =================== */}
                    {activeTab === 'categories' && (
                        <Card padding="none">
                            <div className="p-6 border-b border-[#e8e4df]">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <CardHeader
                                        title="Quản Lý Danh Mục"
                                        subtitle={`${categories.length} danh mục`}
                                        className="!mb-0"
                                    />
                                    <div className="relative">
                                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
                                        <input
                                            id="category-search-input"
                                            type="search"
                                            placeholder="Tìm danh mục..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="input-base !pl-9 !py-2 text-sm !w-56"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#f8f4ef]">
                                            {['#', 'Tên Danh Mục', 'Mô Tả', 'Sản Phẩm', 'Thao Tác'].map((h) => (
                                                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-[#8a8a9a] uppercase tracking-wide">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#f0ebe4]">
                                        {categoriesLoading ? (
                                            Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
                                        ) : categoriesError ? (
                                            <tr>
                                                <td colSpan={5} className="px-5 py-10 text-center text-[#8a8a9a]">
                                                    {categoriesError}
                                                </td>
                                            </tr>
                                        ) : filteredCategories.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-5 py-10 text-center text-[#8a8a9a]">
                                                    Không tìm thấy danh mục
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCategories.map((cat) => {
                                                const productCount = products.filter((p) => p.categoryId === cat.id).length;
                                                return (
                                                    <tr key={cat.id} className="hover:bg-[#fdfaf5] transition-colors" id={`cat-row-${cat.id}`}>
                                                        <td className="px-5 py-4 text-[#8a8a9a] font-mono text-xs">{cat.id}</td>
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-7 h-7 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                                                                    <Tag size={13} className="text-[#c9a84c]" />
                                                                </div>
                                                                <span className="font-semibold text-[#1a1a2e]">{cat.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-[#5a5a6a] max-w-xs">
                                                            <p className="line-clamp-1">{cat.description || '—'}</p>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${productCount > 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                                                <Package size={11} /> {productCount}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    id={`cat-edit-${cat.id}`}
                                                                    onClick={() => openEditCategory(cat)}
                                                                    className="p-2 rounded-lg text-[#8a8a9a] hover:text-[#1a1a2e] hover:bg-[#f0ebe4] transition-all"
                                                                    title="Chỉnh sửa"
                                                                >
                                                                    <Edit2 size={15} />
                                                                </button>
                                                                <button
                                                                    id={`cat-delete-${cat.id}`}
                                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                                    disabled={deletingCategoryId === cat.id}
                                                                    className="p-2 rounded-lg text-[#8a8a9a] hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                                                                    title="Xóa"
                                                                >
                                                                    <Trash2 size={15} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* =================== PRODUCT MODAL =================== */}
            {isProductModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeProductModal} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#e8e4df]">
                            <h2 className="font-display text-xl font-bold text-[#1a1a2e]">
                                {editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                            </h2>
                            <button
                                id="product-modal-close-btn"
                                onClick={closeProductModal}
                                className="p-2 rounded-xl hover:bg-[#f0ebe4] transition-colors text-[#8a8a9a]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            <Input
                                id="modal-product-name"
                                label="Tên Sản Phẩm *"
                                placeholder="VD: Áo Dài Cách Tân Hoa Sen"
                                value={productForm.name}
                                onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                            />

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#2d2d2d]">Mô Tả</label>
                                <textarea
                                    id="modal-product-description"
                                    placeholder="Nhập mô tả sản phẩm..."
                                    value={productForm.description}
                                    onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
                                    rows={3}
                                    className="input-base resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    id="modal-product-material"
                                    label="Chất Liệu"
                                    placeholder="VD: Lụa Tơ Tằm"
                                    value={productForm.material}
                                    onChange={(e) => setProductForm((p) => ({ ...p, material: e.target.value }))}
                                />
                                <Input
                                    id="modal-product-price"
                                    label="Giá (VNĐ)"
                                    type="number"
                                    placeholder="0"
                                    value={productForm.price || ''}
                                    onChange={(e) => setProductForm((p) => ({ ...p, price: Number(e.target.value) }))}
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div className="space-y-1.5">
                                <label htmlFor="modal-product-category" className="text-sm font-semibold text-[#2d2d2d]">
                                    Danh Mục *
                                </label>
                                {categoriesLoading ? (
                                    <div className="input-base text-[#8a8a9a]">Đang tải danh mục...</div>
                                ) : (
                                    <select
                                        id="modal-product-category"
                                        value={productForm.categoryId}
                                        onChange={(e) => setProductForm((p) => ({ ...p, categoryId: Number(e.target.value) }))}
                                        className="input-base"
                                    >
                                        <option value={0} disabled>-- Chọn danh mục --</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="text-sm font-semibold text-[#2d2d2d] block mb-2">Ảnh Sản Phẩm</label>

                                {/* Drag & Drop Zone */}
                                <div
                                    onDrop={handleImageDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => document.getElementById('modal-image-file-input')?.click()}
                                    className="relative border-2 border-dashed border-[#e8e4df] rounded-2xl p-6 text-center cursor-pointer hover:border-[#c9a84c] hover:bg-[#fdfaf5] transition-all group"
                                >
                                    <input
                                        id="modal-image-file-input"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleImageFileChange(e.target.files)}
                                    />
                                    {isUploadingImage ? (
                                        <div className="flex flex-col items-center gap-2 py-2">
                                            <Loader2 size={28} className="text-[#c9a84c] animate-spin" />
                                            <p className="text-sm text-[#8a8a9a]">Đang tải ảnh lên...</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 py-2">
                                            <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
                                                <ImageUp size={22} className="text-[#c9a84c]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#2d2d2d]">Kéo thả ảnh vào đây</p>
                                                <p className="text-xs text-[#8a8a9a] mt-0.5">hoặc click để chọn file • JPG, PNG, WebP, GIF • Tối đa 10MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* URL fallback */}
                                <div className="mt-3 flex gap-2">
                                    <div className="relative flex-1">
                                        <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a9a]" />
                                        <input
                                            id="modal-image-url-input"
                                            type="url"
                                            placeholder="Hoặc dán URL ảnh..."
                                            value={imageUrlInput}
                                            onChange={(e) => setImageUrlInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                                            className="input-base text-sm !pl-9 !py-2"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm" onClick={addImageUrl} id="modal-add-image-btn">Thêm</Button>
                                </div>

                                {/* Preview grid */}
                                {productForm.imageUrls.length > 0 && (
                                    <div className="mt-3 grid grid-cols-3 gap-2">
                                        {productForm.imageUrls.map((url, i) => (
                                            <div key={i} className="relative group/img rounded-xl overflow-hidden bg-[#f0ebe4] aspect-square">
                                                <img
                                                    src={url}
                                                    alt={`Ảnh ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                                />
                                                {i === 0 && (
                                                    <span className="absolute top-1 left-1 bg-[#c9a84c] text-[#1a1a2e] text-[9px] font-bold px-1.5 py-0.5 rounded-full">CHÍNH</span>
                                                )}
                                                <button
                                                    id={`modal-remove-img-${i}`}
                                                    onClick={() => removeImageUrl(i)}
                                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-500"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 p-6 border-t border-[#e8e4df]">
                            <Button variant="ghost" onClick={closeProductModal} className="flex-1" id="product-modal-cancel-btn">
                                Hủy
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveProduct}
                                isLoading={isSavingProduct}
                                className="flex-1"
                                id="product-modal-save-btn"
                                leftIcon={<Save size={15} />}
                            >
                                {editingProduct ? 'Cập Nhật' : 'Tạo Sản Phẩm'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* =================== CATEGORY MODAL =================== */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCategoryModal} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-scale-in">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#e8e4df]">
                            <h2 className="font-display text-xl font-bold text-[#1a1a2e]">
                                {editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                            </h2>
                            <button
                                id="category-modal-close-btn"
                                onClick={closeCategoryModal}
                                className="p-2 rounded-xl hover:bg-[#f0ebe4] transition-colors text-[#8a8a9a]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            <Input
                                id="modal-category-name"
                                label="Tên Danh Mục *"
                                placeholder="VD: Áo Dài, Vest, Đồng Phục..."
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm((c) => ({ ...c, name: e.target.value }))}
                            />
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#2d2d2d]">Mô Tả</label>
                                <textarea
                                    id="modal-category-description"
                                    placeholder="Mô tả ngắn về danh mục..."
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm((c) => ({ ...c, description: e.target.value }))}
                                    rows={3}
                                    className="input-base resize-none"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 p-6 border-t border-[#e8e4df]">
                            <Button variant="ghost" onClick={closeCategoryModal} className="flex-1" id="category-modal-cancel-btn">
                                Hủy
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveCategory}
                                isLoading={isSavingCategory}
                                className="flex-1"
                                id="category-modal-save-btn"
                                leftIcon={<Save size={15} />}
                            >
                                {editingCategory ? 'Cập Nhật' : 'Tạo Danh Mục'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
