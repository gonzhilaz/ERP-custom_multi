'use client';

import React, { useState } from 'react';
import { ShoppingCart, Printer, Trash2, CheckCircle2, BookOpen, HelpCircle, X, Search, Plus, Minus, Scan, Percent, Settings } from 'lucide-react';
import { usePos, MASTER_TAX_OPTIONS } from '@/hooks/pos/usePos';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export const PosView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showTaxSettings, setShowTaxSettings] = useState(false);
  const [showBlindAudit, setShowBlindAudit] = useState(false);
  const [physicalCashCount, setPhysicalCashCount] = useState(4500000);

  const handleBlindAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = 4500000;
    const diff = physicalCashCount - expected;
    if (diff === 0) {
      alert(`Blind Cash Audit Shift Closing Sukses!\n\nUang fisik Laci Kasir: Rp ${physicalCashCount.toLocaleString('id-ID')}\nSistem Expected: Rp ${expected.toLocaleString('id-ID')}\nVariance: Rp 0 (EXACT MATCH 100%)\n\nShift Kasir Ditutup Resmi.`);
    } else {
      alert(`Peringatan Blind Cash Audit!\n\nUang fisik Laci Kasir: Rp ${physicalCashCount.toLocaleString('id-ID')}\nSistem Expected: Rp ${expected.toLocaleString('id-ID')}\nSELISIH VARYANCE: Rp ${diff.toLocaleString('id-ID')}\n\nLaporan Selisih Kasir Otomatis Dikirim ke Finance & Manager!`);
    }
    setShowBlindAudit(false);
  };

  const {
    menuItems,
    menuCategories,
    cart,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedTaxId,
    setSelectedTaxId,
    customTaxRate,
    setCustomTaxRate,
    taxRatePercentage,
    taxCoaAccount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getItemQuantityInCart,
    clearCart,
    subtotalAmount,
    taxAmount,
    totalAmount,
    isReceiptPrinted,
    simulateCheckoutAndPrint
  } = usePos();

  const handleCheckoutWithFinancePosting = () => {
    simulateCheckoutAndPrint();
    alert(
      `POS Checkout Sukses!\n\nRincian Tagihan:\n- SubTotal: Rp ${subtotalAmount.toLocaleString('id-ID')}\n- Pajak (${taxRatePercentage}%): Rp ${taxAmount.toLocaleString('id-ID')}\n- TOTAL DIBAYAR: Rp ${totalAmount.toLocaleString('id-ID')}\n\nJurnal Otomatis Terbit ke Modul Akuntansi (/finance/journals):\n1. [DEBET] 1-10100 Kas Kasir Outlet = Rp ${totalAmount.toLocaleString('id-ID')}\n2. [KREDIT] 4-10100 Pendapatan Penjualan Retail = Rp ${subtotalAmount.toLocaleString('id-ID')}\n3. [KREDIT] ${taxCoaAccount} = Rp ${taxAmount.toLocaleString('id-ID')}\n4. [DEBET] 5-10100 HPP Beban Pokok Penjualan (Auto FIFO)\n5. [KREDIT] 1-10200 Persediaan Barang Dagangan`
    );
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col md:flex-row gap-4">
      {/* Retail Product Panel */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm min-w-0 space-y-3">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-sky-500" />
              <span>Kasir POS Retail</span>
            </h1>

            {/* Glossary Popup Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowGlossary(!showGlossary)}
                className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
                title="Informasi & Glossary POS Retail"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {showGlossary && (
                <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                    <span>Glossary Kasir POS Retail</span>
                    <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    - <strong>Formulasi Pajak POS</strong>: SubTotal + Tax ({taxRatePercentage}%) = Total Dibayar.
                  </p>
                  <p className="text-[11px] text-slate-300">
                    - <strong>Blind Cash Audit</strong>: Penutupan shift kasir tanpa memperlihatkan acuan sistem untuk cegah kecurangan kasir.
                  </p>
                  <p className="text-[11px] text-slate-300">
                    - <strong>COA Utang Pajak</strong>: Pajak terposting otomatis ke akun `{taxCoaAccount}`.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dynamic Tax Rate Setting Trigger */}
            <button
              onClick={() => setShowTaxSettings(!showTaxSettings)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Pajak: {taxRatePercentage}%</span>
              <Settings className="w-3 h-3 text-amber-500 ml-1" />
            </button>

            <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-500/20 shrink-0 font-mono font-semibold">
              <BookOpen className="w-3 h-3 text-indigo-500" />
              <span>COA: 4-10100 & 2-10300</span>
            </div>
          </div>
        </div>

        {/* Tax Configurator Panel Modal / Bar */}
        {showTaxSettings && (
          <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2.5 text-xs border border-slate-700 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Percent className="w-4 h-4" /> Pengaturan Tarif Pajak POS (Non-Hardcoded)
              </span>
              <button onClick={() => setShowTaxSettings(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {MASTER_TAX_OPTIONS.map((tax) => (
                <button
                  key={tax.id}
                  onClick={() => {
                    setSelectedTaxId(tax.id);
                    setShowTaxSettings(false);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedTaxId === tax.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{tax.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{tax.coaAccount}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar / Barcode Scanner & Category Pills */}
        <DynamicSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama barang retail atau scan Barcode SKU..."
          categoryValue={activeCategory}
          onCategoryChange={setActiveCategory}
          categoryOptions={menuCategories.map((c) => ({ label: c.name, value: c.name }))}
          categoryPlaceholder="Semua Barang"
          colorScheme="sky"
        />

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 overflow-y-auto flex-1">
          {menuItems.map((item) => {
            const qtyInCart = getItemQuantityInCart(item.id);

            return (
              <div
                key={item.id}
                className={`p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border flex flex-col justify-between transition-all space-y-2.5 ${
                  qtyInCart > 0
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/30 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400">{item.code}</span>
                    {item.stockQty !== undefined && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                        Stok: {item.stockQty} {item.unitUom || 'Pcs'}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">{item.name}</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Rp {item.price.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Marketplace Quantity Control UI (- 0 +) */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Item</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between bg-sky-600 text-white rounded-lg p-1 shadow-sm">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 bg-sky-700 hover:bg-sky-800 rounded-md flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs px-2 font-mono">{qtyInCart}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 bg-sky-700 hover:bg-sky-800 rounded-md flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart & Checkout Panel */}
      <div className="w-full md:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
        <div className="space-y-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-bold text-xs text-slate-900 dark:text-white">Keranjang Kasir ({cart.length} SKU)</span>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-[10px] text-red-500 hover:underline font-semibold cursor-pointer">
                Kosongkan
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400 space-y-2">
              <ShoppingCart className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <div>Keranjang kosong. Pilih barang atau scan barcode SKU.</div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {cart.map((c) => (
                <div key={c.item.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.item.name}</div>
                    <button onClick={() => removeFromCart(c.item.id)} className="text-red-400 hover:text-red-600 p-0.5 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-sm">
                      <button
                        onClick={() => updateCartQuantity(c.item.id, -1)}
                        className="w-6 h-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs px-2 font-mono">{c.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(c.item.id, 1)}
                        className="w-6 h-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">@ Rp {c.item.price.toLocaleString('id-ID')}</div>
                      <div className="font-bold text-sky-600 dark:text-sky-400">
                        Rp {(c.item.price * c.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Price Breakdown: Subtotal, Dynamic Tax, Total */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>SubTotal Barang</span>
              <span className="font-mono font-semibold">Rp {subtotalAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1">
                <span>Pajak ({taxRatePercentage}%)</span>
                <span className="text-[9px] font-mono bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
                  {taxCoaAccount.split(' - ')[0]}
                </span>
              </span>
              <span className="font-mono font-bold">+ Rp {taxAmount.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-slate-900 dark:text-white">TOTAL HARGA</span>
            <span className="text-sky-600 dark:text-sky-400 text-lg font-mono">Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>

          <button
            onClick={handleCheckoutWithFinancePosting}
            disabled={cart.length === 0 || isReceiptPrinted}
            className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isReceiptPrinted
                ? 'bg-emerald-600 animate-pulse'
                : cart.length === 0
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/30'
            }`}
          >
            {isReceiptPrinted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Thermal Printed & COA Synced!</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>Bayar & Post Jurnal Finance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
