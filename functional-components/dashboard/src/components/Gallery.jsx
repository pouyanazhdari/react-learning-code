import React from 'react';
const Gallery = (props)=>{
    const picturs = props.picturs
  // دادهٔ نمونه در صورت ارسال نشدن prop
  const samplepicturs = [
    { id: '#001', name: 'پوریا احمدی', username: '@pouria', email: 'pouria@example.com', role: 'توسعه‌دهنده فرانت‌اند' },
    { id: '#002', name: 'مریم حسینی', username: '@maryam', email: 'maryam@example.com', role: 'مدیر محصول' },
    { id: '#003', name: 'علی رضایی', username: '@ali', email: 'ali@example.com', role: 'تحقیق و توسعه' }
  ];
      const rows = picturs && picturs.length ? picturs : samplepicturs;

  // هندلرهای نمونه برای دکمه‌ها (فعلاً فقط لاگ می‌زنند)
  const handleView = (u) => {
    // نمایش جزئیات کاربر
    console.log('view', u);
  };
  const handleEdit = (u) => {
    // ویرایش کاربر
    console.log('edit', u);
  };
  const handleDelete = (u) => {
    // حذف کاربر — در عمل باید تأیید و فراخوانی API شود
    console.log('delete', u);
  };
  return (
    // dir="rtl" برای راست‌چین کردن محتوای جدول
    <div dir="rtl" className="container py-3">
      <div className="card shadow-sm rounded-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">لیست تصاویر</h5>
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-plus-lg me-1" /> کاربر جدید
            </button>
          </div>

          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-muted">نتم</th>
                  <th scope="col">نام</th>
                  <th scope="col">نام کاربری</th>
                  <th scope="col">ایمیل</th>
                  <th scope="col" className="text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.id}>
                    <td className="text-muted">{u.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                          style={{ width: 36, height: 36, background: '#6c5ce7' }}
                        >
                          {u.name ? u.name[0] : '?'}
                        </div>
                        <div className="me-2">
                          <div className="fw-semibold">{u.name}</div>
                          <div className="text-muted small">{u.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="text-center">
                      <div className="d-inline-flex">
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          title="نمایش"
                          onClick={() => handleView(u)}
                        >
                          <i className="bi bi-eye" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-success me-1"
                          title="ویرایش"
                          onClick={() => handleEdit(u)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="حذف"
                          onClick={() => handleDelete(u)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted small">نمایش 1 تا {rows.length} از {rows.length} کاربر</div>
            <nav aria-label="صفحه‌بندی">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><a className="page-link" href="#" tabIndex={-1}>قبلی</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">بعدی</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Gallery;
