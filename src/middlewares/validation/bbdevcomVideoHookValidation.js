const bbdevcomVideoHookValidation = {

  onVideoReady: (req, res, next) => {

    if (req.query.mybbdevcomVideoHookKey !== process.env.MY_bbdevcomVideo_HOOK_KEY) {
      return next(new Error("Invalid bbdevcomVideo hook key!"));
    }

    next();

  }

};


module.exports = bbdevcomVideoHookValidation;