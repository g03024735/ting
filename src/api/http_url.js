const root = process.env.API_ROOT

/**课程列表**/
export const course = () => {
  return `${root}/v1/courses`
}

/**课程详情**/
export const courses_detail = courseId => {
  return `${root}/v1/courses/${courseId}`
}

/**公告列表**/
export const notice = () => {
  return `${root}/v1/notices`
}

/**公告详情**/
export const notice_detail = noticeId => {
  return `${root}/v1/notices/${noticeId}`
}

/**获取JWT**/
export const token = () => {
  return `${root}/v1/tokens`
}

/**发表评论**/
export const comment = () => {
  return `${root}/v1/comments`
}

/**音频列表**/
export const voice = () => {
  return `${root}/v1/voices`
}

/**音频详情**/
export const voice_detail = voiceId => {
  return `${root}/v1/voices/${voiceId}`
}
