const Response = ({
    response,
    code = 200,
    data = [],
    msg = "",
}) => {
    response.status(code).json({
        statuscode: code,
        message: msg,
        datas: data
    });
};

export default Response;
