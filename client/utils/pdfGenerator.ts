import { SalarySlip, Employee } from "@shared/api";

export const generateSalarySlipPDF = (slip: SalarySlip, employee: Employee) => {
  // Create a simple HTML document for the salary slip
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Salary Slip - ${slip.month} ${slip.year}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: #f8f9fa;
            }
            .salary-slip {
                background: white;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #3b82f6;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .company-name {
                font-size: 28px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 5px;
            }
            .salary-slip-title {
                font-size: 18px;
                color: #6b7280;
                margin-bottom: 10px;
            }
            .period {
                font-size: 16px;
                color: #3b82f6;
                font-weight: 600;
            }
            .employee-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                padding: 20px;
                background: #f8fafc;
                border-radius: 6px;
            }
            .info-group {
                flex: 1;
            }
            .info-label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
            }
            .info-value {
                color: #6b7280;
                margin-bottom: 15px;
            }
            .salary-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
            }
            .salary-table th,
            .salary-table td {
                padding: 15px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }
            .salary-table th {
                background: #f3f4f6;
                font-weight: 600;
                color: #374151;
            }
            .amount {
                text-align: right;
                font-weight: 600;
            }
            .earnings {
                color: #059669;
            }
            .deductions {
                color: #dc2626;
            }
            .net-pay {
                background: #3b82f6;
                color: white;
                font-size: 18px;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="salary-slip">
            <div class="header">
                <div class="company-name">Crew Portal</div>
                <div class="salary-slip-title">Salary Slip</div>
                <div class="period">${slip.month} ${slip.year}</div>
            </div>
            
            <div class="employee-info">
                <div class="info-group">
                    <div class="info-label">Employee Name</div>
                    <div class="info-value">${employee.fullName}</div>
                    
                    <div class="info-label">Employee ID</div>
                    <div class="info-value">${employee.id}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Department</div>
                    <div class="info-value">${employee.department}</div>
                    
                    <div class="info-label">Designation</div>
                    <div class="info-value">${employee.role}</div>
                </div>
            </div>
            
            <table class="salary-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th class="amount">Amount (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Basic Pay</td>
                        <td class="amount earnings">${slip.basicPay.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>House Rent Allowance (HRA)</td>
                        <td class="amount earnings">${slip.hra.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Bonuses & Incentives</td>
                        <td class="amount earnings">${slip.bonuses.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Gross Earnings</strong></td>
                        <td class="amount earnings"><strong>${(slip.basicPay + slip.hra + slip.bonuses).toLocaleString()}</strong></td>
                    </tr>
                    <tr>
                        <td>Deductions (Tax, PF, etc.)</td>
                        <td class="amount deductions">${slip.deductions.toLocaleString()}</td>
                    </tr>
                    <tr class="net-pay">
                        <td><strong>Net Pay</strong></td>
                        <td class="amount"><strong>₹${slip.netPay.toLocaleString()}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p>This is a computer-generated salary slip and does not require a signature.</p>
                <p>Generated on: ${new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
            </div>
        </div>
    </body>
    </html>
  `;

  // Create a new window with the salary slip
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    // Trigger print dialog after a short delay to ensure content is loaded
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

export const downloadSalarySlipPDF = (slip: SalarySlip, employee: Employee) => {
  // For now, open the print dialog. In a real app, you'd use a library like jsPDF
  generateSalarySlipPDF(slip, employee);
};
