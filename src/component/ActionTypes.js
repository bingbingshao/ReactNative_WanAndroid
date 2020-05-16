/**
 * @author bingPo
 * @date 2020-04-04 15:25
 * @name: ActionTypes
 * @description：ActionTypes
 */


/**
 * 页面返回
 */
export const GO_BACK_PAGE = 'GO_BACK_PAGE'; //返回上一层


/**
 * 修改App主题色
 */
export const INIT_THEME_COLOR = 'INIT_THEME_COLOR'; //初始化主题色
export const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR'; //修改主题色
export const SAVE_THEME_COLOR = 'SAVE_THEME_COLOR'; //存储主题色

/**
 * 登录
 */
export const GO_LOGIN = 'GO_LOGIN';  //跳转登录
export const GO_REGISTER = 'GO_REGISTER';  //跳转注册

export const LOGIN_STATE_CHANGE = 'LOGIN_STATE_CHANGE'; //登录状态变化
export const LOGIN = 'LOGIN'; //登录
export const REGISTER = 'REGISTER'; //注册
export const LOGOUT = 'LOGOUT'; //登出


/**
 * 我的
 */
export const GO_MY = 'GO_MY';  //跳转我的页面
export const GO_MY_INTEGRAL = 'GO_MY_INTEGRAL';  //跳转我的积分
export const GO_MY_INTEGRAL_HISTORY = 'GO_MY_INTEGRAL_HISTORY';  //跳转我的积分历史
export const GO_MY_COLLECT = 'GO_MY_COLLECT';  //跳转我的收藏
export const GO_MY_ARTICLE = 'GO_MY_ARTICLE';  //跳转我的文章
export const GO_MY_WAIT_TO_DO = 'GO_MY_WAIT_TO_DO';  //跳转待办清单
export const GO_MY_OPEN_SOURCE_NET = 'GO_MY_OPEN_SOURCE_NET';  //跳转开源网站
export const GO_MY_JOIN_US = 'GO_MY_JOIN_US';  //跳转加入我们
export const GO_MY_SETTING = 'GO_MY_SETTING';  //跳转系统设置
export const GO_PUBLISH_ARTICLE = 'GO_PUBLISH_ARTICLE';  //跳转分享文章页面


export const MY_STATE_CHANGE = 'MY_STATE_CHANGE';  //我的状态更改
export const MY_INFORMATION = 'MY_INFORMATION';  //获取登录用户的信息
export const PUBLISH_ARTICLE = 'PUBLISH_ARTICLE';  //发布文章
export const MY_INTEGRAL = 'MY_INTEGRAL';  //获取积分排行榜
export const MY_INTEGRAL_HISTORY = 'MY_INTEGRAL_HISTORY';  //获取我的积分历史
export const MY_COLLECT_ARTICLE = 'MY_COLLECT_ARTICLE';  //获取我的收藏的文章
export const MY_COLLECT_NET = 'MY_COLLECT_NET';  //获取我的收藏的网址
export const MY_ARTICLE = 'MY_ARTICLE';  //获取我的文章
export const MY_ARTICLE_DELETE = 'MY_ARTICLE_DELETE';  //删除我的文章


/**
 * 首页
 */
export const GO_SEARCH = 'GO_SEARCH';  //跳转搜索
export const GO_SEARCH_RESULT = 'GO_SEARCH_RESULT';  //跳转搜索结果

export const GO_WEB_VIEW = 'GO_WEB_VIEW';  //跳转webview显示页面

export const HOME_STATE_CHANGE = 'HOME_STATE_CHANGE'; //首页状态更改
export const HOME_BANNER = 'HOME_BANNER'; //首页获取轮播列表
export const HOME_ARTICLE = 'HOME_ARTICLE'; //首页获取文章列表
export const SEARCH_HOT = 'SEARCH_HOT'; //首页获取目前搜索最多的关键词
export const SEARCH_DATA = 'SEARCH_DATA'; //首页根据关键词搜索
export const COLLECT_ARTICLE = 'COLLECT_ARTICLE'; //首页收藏文章
export const COLLECT_ARTICLE_DELETE = 'COLLECT_ARTICLE_DELETE'; //首页删除收藏文章
export const COLLECT_NET = 'COLLECT_NET'; //首页收藏网址
export const COLLECT_NET_DELETE = 'COLLECT_NET_DELETE'; //首页删除收藏网址

/**
 *  项目
 */
export const PROJECT_STATE_CHANGE = 'PROJECT_STATE_CHANGE'; //项目状态更改
export const PROJECT_MENU = 'PROJECT_MENU'; //获取项目菜单
export const PROJECT_LIST = 'PROJECT_LIST'; //根据菜单ID获取数据列表

/**
 *  广场
 */
export const GO_SQUARE_SERIES_DETAILS = 'GO_SQUARE_SERIES_DETAILS'; //跳转广场提携二级菜单页面


export const SQUARE_STATE_CHANGE = 'SQUARE_STATE_CHANGE'; //广场状态更改
export const SQUARE_LIST = 'SQUARE_LIST'; //获取广场数据列表
export const SQUARE_SERIES = 'SQUARE_SERIES'; //获取广场体系数据
export const SQUARE_SERIES_DETAILS = 'SQUARE_SERIES_DETAILS'; //获取广场体系数据 二级菜单
export const SQUARE_NAVIGATION = 'SQUARE_NAVIGATION'; //获取广场导航数据

/**
 *  公众号
 */
export const ACCOUNT_STATE_CHANGE = 'ACCOUNT_STATE_CHANGE'; //公众号状态更改
export const ACCOUNT_MENU = 'ACCOUNT_MENU'; //公众号菜单
export const ACCOUNT_LIST = 'ACCOUNT_LIST'; //公众号数据列表
