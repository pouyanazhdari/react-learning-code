import React from "react";
import ReactDOM from "react-dom";
import jpAxios from "../JPAxios";

export const getPostsDataService = async () => {
    try {
        const res = await jpAxios.get("/posts");
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error(error)
    }
}
// حذف کاربر
export const deletePostService = async (postId) => {
  try {
    const res = await jpAxios.delete(`/posts/${postId}`);
    if (res.status === 200) {
      return true; // ✅ حذف موفق
    }
  } catch (error) {
    console.error("خطا در حذف پست:", error);
  }
  return false; // ❌ حذف ناموفق
};
// اضافه یا ویرایش کاربر
export const addPostService = async (id, postData) => {
  const isEdit = Boolean(id);
  const url = isEdit ? `/posts/${id}` : `/posts`;
  const method = isEdit ? "put" : "post";

  try {
    const res = await jpAxios[method](url, postData);
    if (res.status === 200 || res.status === 201) {
      alert(isEdit ? "پست با موفقیت ویرایش شد" : "پست با موفقیت اضافه شد");
      return true;
    }
  } catch (err) {
    console.error("خطا در ارسال داده:", err);
    return false;
  }
};

// دریافت داده یک کاربر
export const loadPostDataService = async (id) => {
  if (!id) return null;
  try {
    const res = await jpAxios.get(`/posts/${id}`);
    if (res.status === 200) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.error("خطا در دریافت داده کاربر:", error);
    return null;
  }
};
