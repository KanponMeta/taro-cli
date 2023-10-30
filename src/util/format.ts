interface MaterialRecord {
    id: string;
    scanId: string;
    scanName: string;
    name: string;
    weight: string;
    unit: string;
    suplier?: string;
    dc?: string;
    batch: string;
    saveDate?: string;
    qiankunBatch?: string;
    supplierBatch: string;
    specialPurchaseOrderId?: string;
    checkDate?: string;
    expirationDate?: string;
}

export function formatCode(code: string): MaterialRecord {
  const codeSplit = code.split('{');
  const codeTrim = codeSplit.map(item => item.trim());
  const record: MaterialRecord = {
    id: '', // 料号
    name: '', // 物料名称
    scanId: '', // 扫码料号
    scanName: '', // 扫码名称
    weight: '', // 数量
    unit: '', // 单位
    suplier: '', // 供应商
    dc: '', // DC
    batch: '', // 检验批号
    saveDate: '', // 保存日期
    qiankunBatch: '', // 乾坤Batch
    supplierBatch: '', // 供应商批号
    specialPurchaseOrderId: '', // 特殊采购单
    checkDate: '', // 检验日期
    expirationDate: '', // 有效日期
  };

  if (codeTrim.length == 9) {
    record.scanName = codeTrim[0]; // 扫码名称
    record.weight = codeTrim[1]; // 数量
    record.unit = codeTrim[2]; // 单位
    record.supplierBatch = codeTrim[3]; // 厂商代码
    record.batch = codeTrim[4]; // 检验批号
    record.expirationDate = codeTrim[7]; // 有效日期
  } else if (codeTrim.length == 12) {
    record.scanId = codeTrim[0]; // 扫码料号
    record.weight = codeTrim[1]; // 数量
    record.unit = codeTrim[2]; // 单位
    record.suplier = codeTrim[3]; // 供应商
    record.dc = codeTrim[4]; // DC
    record.batch = codeTrim[6]; // 检验批号
    record.saveDate = codeTrim[7]; // 保存日期
    record.qiankunBatch = codeTrim[8]; // 乾坤Batch
    record.supplierBatch = codeTrim[9]; // 厂商代码
    record.checkDate = codeTrim[10]; // 检验日期
  } else if (codeTrim.length == 13) {
    record.scanId = codeTrim[0]; // 扫码料号
    record.weight = codeTrim[1]; // 数量
    record.unit = codeTrim[2]; // 单位
    record.suplier = codeTrim[3]; // 供应商
    record.dc = codeTrim[4]; // DC
    record.batch = codeTrim[6]; // 检验批号
    record.saveDate = codeTrim[7]; // 保存日期
    record.qiankunBatch = codeTrim[8]; // 乾坤Batch
    record.supplierBatch = codeTrim[9]; // 厂商代码
    record.specialPurchaseOrderId = codeTrim[10]; // 特殊采购单
    record.checkDate = codeTrim[11]; // 检验日期
  }

  return record;
}

// 工单扫描解析算法
export function formatTicketCode(code?: string): {
  ticketName: string;
  production: string;
  processType: string;
} {
  if (!code) return {ticketName: '', production: '', processType: ''};

  const codes = code.split(' ');
  const [ticketName, production, processType] = [...codes];
  return {
    ticketName,
    production,
    processType,
  };
}

export function parseJSONString(str: string, needClean?: boolean): any {
  try {
    let cleanedJsonString = str;
    if (needClean) {
      cleanedJsonString = str.replace(/[\u0000-\u001F]/g, ''); // 删除控制字符
    }

    // 现在可以尝试解析清理后的 JSON 字符串
    const json = JSON.parse(cleanedJsonString);

    return json;
  } catch (error) {
    // console.error('parseJSONString出错', error);
    return {};
  }
}
