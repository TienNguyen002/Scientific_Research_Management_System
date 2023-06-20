import React from 'react';

const PriceComponent = ({ amount }) => {
  // Tách số tiền thành hàng nghìn
  const formattedAmount = amount ? amount.toLocaleString('vi-VI') : '';

  return (
    <div>
      <p>{formattedAmount} VNĐ</p>
    </div>
  );
};

export default PriceComponent;
