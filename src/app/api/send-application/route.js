import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Get form fields
    const fullName = formData.get("fullName");
    const address = formData.get("address");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const militaryStatus = formData.get("militaryStatus");
    const coverLetter = formData.get("coverLetter");
    const cvFile = formData.get("cv");

    // Validate required fields
    if (
      !fullName ||
      !address ||
      !phone ||
      !position ||
      !militaryStatus ||
      !cvFile
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file is not empty
    if (buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: "CV file is empty" },
        { status: 400 }
      );
    }

    // Get safe filename and determine content type
    const safeFilename = cvFile.name.replace(
      /[^a-zA-Z0-9\u0600-\u06FF._-]/g,
      "_"
    );
    const fileExtension = cvFile.name.split(".").pop().toLowerCase();

    // Determine correct content type
    let contentType = cvFile.type;
    if (!contentType || contentType === "application/octet-stream") {
      const mimeTypes = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
      contentType = mimeTypes[fileExtension] || "application/octet-stream";
    }

    // Save file to server
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "cvs");

    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${safeFilename}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Save file
    await writeFile(filePath, buffer);

    // Generate download URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const downloadUrl = `${baseUrl}/uploads/cvs/${uniqueFilename}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: email || process.env.SMTP_FROM,
      subject: `طلب توظيف جديد من ${fullName} - New Job Application`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #b44041, #0c6776); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 28px;">📋 طلب توظيف جديد</h1>
          </div>
          
          <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #b44041; border-bottom: 2px solid #0c6776; padding-bottom: 10px;">معلومات المتقدم</h2>
            
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold; width: 35%;">👤 الاسم الكامل:</td>
                <td style="padding: 10px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📍 العنوان:</td>
                <td style="padding: 10px;">${address}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📧 البريد الإلكتروني:</td>
                <td style="padding: 10px;">${email || "غير متوفر"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">📱 رقم الهاتف:</td>
                <td style="padding: 10px;" dir="ltr" style="text-align: right;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">💼 الوظيفة المطلوبة:</td>
                <td style="padding: 10px;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa; font-weight: bold;">🛡️ الموقف من التجنيد:</td>
                <td style="padding: 10px;">${militaryStatus}</td>
              </tr>
            </table>

            ${
              coverLetter
                ? `
              <h2 style="color: #b44041; border-bottom: 2px solid #0c6776; padding-bottom: 10px; margin-top: 30px;">✉️ خطاب التغطية</h2>
              <div style="background: #f8f9fa; padding: 15px; border-right: 4px solid #0c6776; margin: 20px 0; line-height: 1.8;">
                ${coverLetter.replace(/\n/g, "<br>")}
              </div>
            `
                : ""
            }

            <div style="background: linear-gradient(135deg, #e3f2fd, #e8f5e9); padding: 25px; border-radius: 12px; margin-top: 30px; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #666; font-weight: bold; font-size: 17px;">📎 السيرة الذاتية</p>
              
              <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #b44041, #0c6776); color: #fff; padding: 14px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 5px 20px rgba(180, 64, 65, 0.4); margin-bottom: 12px;">
                🔽 تحميل السيرة الذاتية
              </a>
              
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>تم الإرسال تلقائياً من نظام التوظيف - شركة نور الدين</p>
            <p>تاريخ الإرسال: ${new Date().toLocaleString("ar-EG")}</p>
          </div>
        </div>
      `,
      text: `
طلب توظيف جديد

معلومات المتقدم:
━━━━━━━━━━━━━━━━
الاسم الكامل: ${fullName}
العنوان: ${address}
البريد الإلكتروني: ${email || "غير متوفر"}
رقم الهاتف: ${phone}
الوظيفة المطلوبة: ${position}
الموقف من التجنيد: ${militaryStatus}

${coverLetter ? `خطاب التغطية:\n${coverLetter}\n` : ""}
━━━━━━━━━━━━━━━━
📎 السيرة الذاتية:
اسم الملف: ${safeFilename}
الحجم: ${(buffer.length / 1024).toFixed(2)} KB

🔗 رابط التحميل:
${downloadUrl}

💡 الملف متاح أيضاً كمرفق في هذا البريد

تاريخ الإرسال: ${new Date().toLocaleString("ar-EG")}
      `,
      attachments: [
        {
          filename: safeFilename,
          content: buffer,
          contentType: contentType,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Application sent successfully",
    });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send application" },
      { status: 500 }
    );
  }
}
