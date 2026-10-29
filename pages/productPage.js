import { BasePage } from './basePage';

export class ProductPage extends BasePage {
    urlProductPage = 'https://vivainternational.vn/quan-tri/products';

    constructor(page) {
        super(page);
        this.addProductButton = page.locator(
            "//button[@type='button' and contains(., 'Thêm Sản Phẩm')]"
        );
        this.productForm = page.locator('form').last();
        this.nameOfProduct = this.productForm.locator(
            "//input[@placeholder='Tên Sản Phẩm']"
        );
        this.desribeProduct = this.productForm.locator(
            "//textarea[@placeholder='Mô Tả Sản Phẩm']"
        );
        this.danhMucInput = this.productForm.locator(
            "//input[@placeholder='Chọn danh mục']"
        );
        this.loaiSanPham = this.productForm.locator(
            "//*[@title='Cà phê']"
        );
        this.giaGoc = this.productForm.locator(
            "//input[@placeholder='Giá gốc']"
        );
        this.giaKhuyenMai = this.productForm.locator(
            "//input[@placeholder='Giá khuyến mãi']"
        );
        this.skuInput = this.productForm.locator(
            "//input[@placeholder='SKU Sản Phẩm']"
        );
        this.barcodeInput = this.productForm.locator(
            "//input[@placeholder='Mã Vạch Sản Phẩm']"
        );
        this.quantityInput = this.productForm.locator(
            "//input[@placeholder='Số Lượng Sản Phẩm']"
        );
        this.tagInput = this.productForm.locator(
            "//input[contains(@placeholder, 'Thẻ sản phẩm')]"
        );
        this.submitProductButton = this.productForm.locator(
            "//button[@type='submit']"
        );
        this.productNames = page.locator('//table//h2');
    }

    async navigateToProductPage() {
        await this.navigateTo(this.urlProductPage);
    }

    async openAddProductForm() {
        await this.addProductButton.click();
    }

    async fillNameOfProduct(name) {
        await this.nameOfProduct.fill(name);
    }

    async fillMoTaSanPham(description) {
        await this.desribeProduct.fill(description);
    }

    async clickLoaiCafe() {
        await this.loaiSanPham.click({ force: true });
    }

    async fillGiaGoc(giaGoc) {
        await this.giaGoc.fill(giaGoc);
    }

    async fillGiaKhuyenMai(giaKhuyenMai) {
        await this.giaKhuyenMai.fill(giaKhuyenMai);
    }

    async fillProductDetails(product) {
        await this.fillNameOfProduct(product.name);
        await this.fillMoTaSanPham(product.description);
        await this.skuInput.fill(product.sku);
        await this.barcodeInput.fill(product.barcode);
        await this.clickLoaiCafe();
        await this.fillGiaGoc(product.originalPrice);
        await this.fillGiaKhuyenMai(product.salePrice);
        await this.quantityInput.fill(product.quantity);

        if (product.tag) {
            await this.tagInput.fill(product.tag);
            await this.tagInput.press('Enter');
        }
    }

    async submitProduct() {
        await this.submitProductButton.click();
    }

    async addProduct(product) {
        await this.openAddProductForm();
        await this.fillProductDetails(product);
        await this.submitProduct();
    }

    getProductRow(productName) {
        return this.page.locator(`//tr[.//h2[contains(text(), '${productName}')]]`);
    }

    getDeleteButton(productName) {
        return this.page.locator(
            `//tr[.//h2[contains(text(), '${productName}')]]//button[p[@data-tooltip-id='delete']]`
        );
    }

    getConfirmDeleteButton(productName) {
        return this.page.locator(
            `//div[contains(., '${productName}')]//button[normalize-space()='Có, Xoá Ngay']`
        );
    }

    async deleteProduct(productName) {
        await this.getDeleteButton(productName).click();
        await this.getConfirmDeleteButton(productName).click();
    }
}