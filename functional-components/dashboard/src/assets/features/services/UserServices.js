import jpAxios from "../JPAxios";

// گرفتن لیست کاربران
export const getUsersDataService = async () => {
  try {
    const res = await jpAxios.get("/users");
    if (res.status === 200) {
      return res.data; // ✅ فقط داده رو برگردون
    }
  } catch (err) {
    console.error("خطا در دریافت کاربران:", err);
    return [];
  }
};

// حذف کاربر
export const deleteUserService = async (userId) => {
  try {
    const res = await jpAxios.delete(`/users/${userId}`);
    if (res.status === 200) {
      return true; // ✅ حذف موفق
    }
  } catch (error) {
    console.error("خطا در حذف کاربر:", error);
  }
  return false; // ❌ حذف ناموفق
};

// اضافه یا ویرایش کاربر
export const addUserService = async (id, userData) => {
  const isEdit = Boolean(id);
  const url = isEdit ? `/users/${id}` : `/users`;
  const method = isEdit ? "put" : "post";

  try {
    const res = await jpAxios[method](url, userData);
    if (res.status === 200 || res.status === 201) {
      alert(isEdit ? "کاربر با موفقیت ویرایش شد" : "کاربر با موفقیت اضافه شد");
      return true;
    }
  } catch (err) {
    console.error("خطا در ارسال داده:", err);
    return false;
  }
};

// دریافت داده یک کاربر
export const loadUserDataService = async (id) => {
  if (!id) return null;
  try {
    const res = await jpAxios.get(`/users/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("خطا در دریافت داده کاربر:", error);
    return null;
  }
};
