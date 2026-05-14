import React, { useState } from 'react';
import { ArrowRightLeft, CreditCard, AlertTriangle, CheckCircle, Shield, RefreshCcw } from 'lucide-react';

export default function SQLTransactionDemo() {
  const [step, setStep] = useState(0); // 0: initial, 1: started, 2: deduct A, 3: error/commit, 4: rollback
  const [balanceA, setBalanceA] = useState(1000);
  const [balanceB, setBalanceB] = useState(0);
  const [statusMsg, setStatusMsg] = useState('ระบบพร้อมทำงาน: คลิก START TRANSACTION เพื่อเริ่มโอนเงิน');

  const startTransaction = () => {
    setStep(1);
    setStatusMsg('START TRANSACTION: เริ่มต้นการทำธุรกรรม (ระบบจะล็อกข้อมูลไว้ชั่วคราว)');
  };

  const deductA = () => {
    setStep(2);
    setBalanceA(500);
    setStatusMsg('UPDATE: หักเงินจากนาย A 500 บาท (แต่เงินยังไม่เข้าบัญชีนาย B!)');
  };

  const simulateError = () => {
    setStep(3);
    setStatusMsg('ERROR!: เกิดไฟดับ หรืออินเทอร์เน็ตหลุดกะทันหัน! ระบบชะงัก...');
  };

  const commitTransaction = () => {
    setStep(5);
    setBalanceB(500);
    setStatusMsg('COMMIT: ยืนยันการทำธุรกรรมสำเร็จ ข้อมูลถูกบันทึกลงฐานข้อมูลถาวร');
  };

  const rollbackTransaction = () => {
    setStep(4);
    setBalanceA(1000); // Revert
    setStatusMsg('ROLLBACK: ยกเลิกการทำธุรกรรมทั้งหมดและคืนค่าเดิม (นาย A ได้เงิน 500 คืน)');
  };

  const reset = () => {
    setStep(0);
    setBalanceA(1000);
    setBalanceB(0);
    setStatusMsg('ระบบพร้อมทำงาน: คลิก START TRANSACTION เพื่อเริ่มโอนเงิน');
  };

  return (
    <div className="space-y-12 my-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex gap-4 items-start">
        <div className="p-4 bg-amber-100 text-amber-600 rounded-xl shrink-0">
          <ArrowRightLeft size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Transaction State Visualizer</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ทำไมระบบธนาคารถึงต้องมี <code>COMMIT</code> และ <code>ROLLBACK</code>? ลองจำลองการโอนเงินและสร้างสถานการณ์ "ไฟดับ" ระหว่างโอนดูสิครับ!
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700 p-8">
        
        {/* Status Screen */}
        <div className={`mb-8 p-4 rounded-xl border-2 flex items-center gap-3 font-bold text-lg transition-colors ${
          step === 0 ? 'bg-slate-800 border-slate-600 text-slate-300' :
          step === 1 ? 'bg-indigo-900/50 border-indigo-500 text-indigo-300' :
          step === 2 ? 'bg-yellow-900/50 border-yellow-500 text-yellow-300' :
          step === 3 ? 'bg-red-900/50 border-red-500 text-red-300' :
          step === 4 ? 'bg-orange-900/50 border-orange-500 text-orange-300' :
          'bg-emerald-900/50 border-emerald-500 text-emerald-300'
        }`}>
          {step === 3 && <AlertTriangle className="animate-pulse" />}
          {step === 4 && <Shield />}
          {step === 5 && <CheckCircle />}
          {statusMsg}
        </div>

        {/* Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          
          {/* Account A */}
          <div className={`flex-1 w-full bg-white rounded-xl p-6 text-center border-4 transition-all duration-500 ${
            step === 2 || step === 3 ? 'border-yellow-400 scale-95 opacity-80' : 
            step === 4 ? 'border-orange-400 scale-100' :
            step === 5 ? 'border-slate-200' : 'border-slate-200'
          }`}>
            <CreditCard size={48} className="mx-auto mb-4 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">บัญชีนาย A</h3>
            <div className="mt-4 text-4xl font-black text-slate-700">
              ฿{balanceA}
            </div>
            {step === 2 && <div className="text-rose-500 font-bold mt-2 animate-bounce">- ฿500</div>}
          </div>

          {/* Transfer Arrow */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className={`h-2 w-full max-w-[200px] rounded-full transition-all duration-1000 ${
              step === 0 || step === 1 ? 'bg-slate-700' :
              step === 2 ? 'bg-gradient-to-r from-yellow-400 to-slate-700 bg-[length:200%_100%] animate-[bg-pan-right_2s_infinite]' :
              step === 3 ? 'bg-gradient-to-r from-red-500 to-slate-700' :
              step === 4 ? 'bg-gradient-to-l from-slate-700 to-orange-400 bg-[length:200%_100%] animate-[bg-pan-left_1s_forwards]' :
              'bg-emerald-500'
            }`}></div>
            <div className="mt-4 font-mono text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded">
              {step >= 1 && step < 5 ? 'Pending Transaction...' : 'Idle'}
            </div>
          </div>

          {/* Account B */}
          <div className={`flex-1 w-full bg-white rounded-xl p-6 text-center border-4 transition-all duration-500 ${
            step === 5 ? 'border-emerald-500 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-slate-200'
          }`}>
            <CreditCard size={48} className="mx-auto mb-4 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-800">บัญชีนาย B</h3>
            <div className="mt-4 text-4xl font-black text-slate-700">
              ฿{balanceB}
            </div>
            {step === 5 && <div className="text-emerald-500 font-bold mt-2 animate-bounce">+ ฿500</div>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={startTransaction} 
            disabled={step !== 0}
            className={`py-3 rounded-xl font-bold transition-all ${step === 0 ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:-translate-y-1' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            1. START
          </button>
          
          <button 
            onClick={deductA} 
            disabled={step !== 1}
            className={`py-3 rounded-xl font-bold transition-all ${step === 1 ? 'bg-yellow-600 text-white hover:bg-yellow-500 hover:-translate-y-1' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            2. หักเงินนาย A
          </button>

          {step === 2 && (
            <div className="col-span-2 flex gap-4 animate-in slide-in-from-bottom-4">
              <button 
                onClick={simulateError} 
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <AlertTriangle size={18}/> 3. จำลองไฟดับ!
              </button>
              <button 
                onClick={commitTransaction} 
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <CheckCircle size={18}/> 3. ยืนยัน COMMIT
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="col-span-2 animate-in slide-in-from-bottom-4">
              <button 
                onClick={rollbackTransaction} 
                className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2"
              >
                <Shield size={18}/> กู้คืนระบบ (ROLLBACK)
              </button>
            </div>
          )}

          {(step === 4 || step === 5) && (
            <div className="col-span-2 animate-in fade-in">
              <button 
                onClick={reset} 
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18}/> เริ่มการทดลองใหม่
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
