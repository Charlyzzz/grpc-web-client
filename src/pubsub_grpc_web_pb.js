/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for live
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.live = require('./pubsub_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.live.LiveClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.live.LivePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.live.SubRequest,
 *   !proto.live.Event>}
 */
const methodDescriptor_Live_Subscribe = new grpc.web.MethodDescriptor(
  '/live.Live/Subscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.live.SubRequest,
  proto.live.Event,
  /** @param {!proto.live.SubRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.live.Event.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.live.SubRequest,
 *   !proto.live.Event>}
 */
const methodInfo_Live_Subscribe = new grpc.web.AbstractClientBase.MethodInfo(
  proto.live.Event,
  /** @param {!proto.live.SubRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.live.Event.deserializeBinary
);


/**
 * @param {!proto.live.SubRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.live.Event>}
 *     The XHR Node Readable Stream
 */
proto.live.LiveClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/live.Live/Subscribe',
      request,
      metadata || {},
      methodDescriptor_Live_Subscribe);
};


/**
 * @param {!proto.live.SubRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.live.Event>}
 *     The XHR Node Readable Stream
 */
proto.live.LivePromiseClient.prototype.subscribe =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/live.Live/Subscribe',
      request,
      metadata || {},
      methodDescriptor_Live_Subscribe);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.live.EventRequest,
 *   !proto.live.EmitAck>}
 */
const methodDescriptor_Live_EmitEvent = new grpc.web.MethodDescriptor(
  '/live.Live/EmitEvent',
  grpc.web.MethodType.UNARY,
  proto.live.EventRequest,
  proto.live.EmitAck,
  /** @param {!proto.live.EventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.live.EmitAck.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.live.EventRequest,
 *   !proto.live.EmitAck>}
 */
const methodInfo_Live_EmitEvent = new grpc.web.AbstractClientBase.MethodInfo(
  proto.live.EmitAck,
  /** @param {!proto.live.EventRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.live.EmitAck.deserializeBinary
);


/**
 * @param {!proto.live.EventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.live.EmitAck)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.live.EmitAck>|undefined}
 *     The XHR Node Readable Stream
 */
proto.live.LiveClient.prototype.emitEvent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/live.Live/EmitEvent',
      request,
      metadata || {},
      methodDescriptor_Live_EmitEvent,
      callback);
};


/**
 * @param {!proto.live.EventRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.live.EmitAck>}
 *     A native promise that resolves to the response
 */
proto.live.LivePromiseClient.prototype.emitEvent =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/live.Live/EmitEvent',
      request,
      metadata || {},
      methodDescriptor_Live_EmitEvent);
};


module.exports = proto.live;

