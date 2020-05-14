/**
 *  @author Wolf.Ma
 *  @date 2019-11-07 15:52
 * 后台接口
 */
//版本号码
let API_VERSION = 'V1.0.0';         //生产最新版本 1.2.1    //改造版本 1.1.0

let API_DOMAIN = 'https://www.wanandroid.com';  //玩Android  https://www.wanandroid.com/blog/show/2

const API = {
    /**
     * 登录相关
     */
    LOGIN: API_DOMAIN + '/user/login', //用户登录
    REGISTER: API_DOMAIN + '/user/register', //用户注册
    LOGOUT: API_DOMAIN + '/user/logout/json', //用户登出

    /**
     * 首页相关
     */
    HOME_BANNER: API_DOMAIN + '/banner/json',  //轮播图
    HOME_ARTICLE_LIST: API_DOMAIN + '/article/list/',  //文章列表
    HOME_ARTICLE_LIST_END: '/json',  //文章列表
    HOME_ARTICLE_LIST_TOP: API_DOMAIN + '/article/top/json',  //置顶文章
    SEARCH_HOT: API_DOMAIN + '/hotkey/json',  //获取目前搜索最多的关键词
    SEARCH_DATA: API_DOMAIN + '/article/query/',  //根据关键词搜索
    COLLECT_ARTICLE: API_DOMAIN + '/lg/collect/',  //收藏文章
    DELETE_COLLECT_ARTICLE: API_DOMAIN + '/lg/uncollect_originId/',  //删除收藏文章
    COLLECT_NET: API_DOMAIN + '/lg/collect/updatetool/json',  //收藏网址
    COLLECT_ARTICLE_LIST: API_DOMAIN + '/lg/collect/list/',  //收藏文章列表

    /**
     * 项目
     */
    PROJECT_MENU: API_DOMAIN + '/project/tree/json', //获取项目菜单
    PROJECT_LIST: API_DOMAIN + '/project/list/', //根据菜单ID获取数据列表

    /**
     * 广场
     */
    SQUARE_LIST: API_DOMAIN + '/user_article/list/', //获取广场数据列表
    SQUARE_SERIES: API_DOMAIN + '/tree/json', //获取体系数据
    SQUARE_SERIES_LIST: API_DOMAIN + '/article/list/', //获取体系数据 二级数据列表
    SQUARE_NAVIGATION: API_DOMAIN + '/navi/json', //获取导航数据


    /**
     * 公众号
     */
    ACCOUNT_MENU: API_DOMAIN + '/wxarticle/chapters/json ', //获取公众号菜单
    ACCOUNT_LIST: API_DOMAIN + '/wxarticle/list/', //根据菜单ID获取数据列表

    /**
     * 我的相关
     */
    MY_RANG_INFO: API_DOMAIN + '/lg/coin/userinfo/json',  //获取个人积分，需要登录后访问
    PUBLISH_ARTICLE: API_DOMAIN + '/lg/user_article/add/json', //发布文章
    MY_INTEGRAL: API_DOMAIN + '/coin/rank/', //获取积分排行榜
    MY_INTEGRAL_HISTORY: API_DOMAIN + '/lg/coin/list/', //获取我的积分历史
    MY_ARTICLE_COLLECT_LIST: API_DOMAIN + '/lg/collect/list/', //获取我的文章收藏列表
    MY_NET_COLLECT_LIST: API_DOMAIN + '/lg/collect/usertools/json', //获取我的网址收藏列表
    MY_ARTICLE: API_DOMAIN + '/user/lg/private_articles/', //获取我的分享的文章
    MY_ARTICLE_DELETE: API_DOMAIN + '/lg/user_article/delete/', //获取我的分享的文章

};

module.exports = API;
